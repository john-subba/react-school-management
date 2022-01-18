const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// call models
const Exam = require('../../models/Exam');

//@route GET /api/exams
//@desc  get all of the exams
router.get('/', auth, async (req, res) => {
  try {
    const exam = await Exam.find();

    res.json(exam);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

//@route POST /api/exams
//@desc  add exams to the user
router.post(
  '/',
  auth,
  [check('title', 'Name is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, fromDate, toDate } = req.body;

    const examFields = {};
    examFields.user = req.user.id;
    if (title) examFields.title = title;
    if (fromDate) examFields.fromDate = fromDate;
    if (toDate) examFields.toDate = toDate;

    try {
      let exam = await Exam.findById(req.user.id).populate('user');

      exam = new Exam(examFields);

      await exam.save();
      res.json(exam);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route PUT /api/exams/:exam_id
//@desc  edit exam details using exam id
router.put('/:exam_id', auth, async (req, res) => {
  const { title, fromDate, toDate } = req.body;

  try {
    const exam = await Exam.findById(req.params.exam_id);

    if (title) exam.title = `${title}`;
    if (fromDate) exam.fromDate = `${fromDate}`;
    if (toDate) exam.toDate = `${toDate}`;
    await exam.save();
    res.json(exam);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route DELETE /api/exams/:exam_id
//@desc  edit exam and all of its details by exam id
router.delete('/:exam_id', auth, async (req, res) => {
  try {
    await Exam.findOneAndRemove(req.params.exam_id);
    res.json('Exam has been deleted.');
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST /api/exams/:exam_id/subjects
//@desc  add subject to the exam
router.post(
  '/:exam_id/subjects',
  [
    check('title', 'Subject Title is required').not().isEmpty(),
    check('subjectTeacher', 'Subject Teacher is required').not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, subjectTeacher } = req.body;

    const newSubject = {
      title,
      subjectTeacher,
    };

    try {
      const exam = await Exam.findById(req.params.exam_id);

      exam.subjects.push(newSubject);
      await exam.save();
      res.json(exam);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route PUT /api/exams/:exam_id/subjects/:subject_id
//@desc  edit subject details by subjectid
router.put('/:exam_id/subjects/:subject_id', auth, async (req, res) => {
  const { title, subjectTeacher } = req.body;

  try {
    const exam = await Exam.findById(req.params.exam_id);

    // get index for update
    const index = exam.subjects
      .map((subject) => subject.id)
      .indexOf(req.params.subject_id);

    const subject = exam.subjects[index];

    if (title) subject.title = `${title}`;
    if (subjectTeacher) subject.subjectTeacher = `${subjectTeacher}`;

    await exam.save();

    res.json(exam);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route DELETE /api/exams/:exam_id/subjects/:subject_id
//@desc  delete subject by subjectid
router.delete('/:exam_id/subjects/:subject_id', auth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.exam_id);

    // get index for update
    const index = exam.subjects
      .map((subject) => subject.id)
      .indexOf(req.params.subject_id);

    exam.subjects.splice(index, 1);

    await exam.save();
    res.json(exam);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
