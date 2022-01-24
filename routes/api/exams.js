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
    const exam = await Exam.find({ user: req.user.id });

    res.json(exam);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

//@route GET /api/exams/:exam_id
//@desc   get single exam by its id
router.get('/:exam_id', auth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.exam_id);

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
      let exam = await Exam.find({ user: req.user.id });

      exam = new Exam(examFields);

      await exam.save();

      let userExams = await Exam.find({ user: req.user.id });
      res.json(userExams);
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
    let exam = await Exam.find({ user: req.user.id });
    res.json(exam);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
