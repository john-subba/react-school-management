const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Exam = require('../../models/Exam');
const Subject = require('../../models/Subject');

//@route /api/subjects/:exam_id
//@desc  get the subjects of only particular exam
router.get('/:exam_id', auth, async (req, res) => {
  try {
    const subjects = await Subject.find({ exam: req.params.exam_id });
    if (!subjects) {
      return res.json({
        msg: 'There are no any subjects for this examination',
      });
    }
    res.json(subjects);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route /api/subjects
//@desc  add subject to the exam
router.post(
  '/:exam_id',
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

    const subjectsFields = {};
    subjectsFields.exam = req.params.exam_id;
    if (title) subjectsFields.title = title;
    if (subjectTeacher) subjectsFields.subjectTeacher = subjectTeacher;

    try {
      let subject = await Subject.find({ exam: req.params.exam_id });

      subject = new Subject(subjectsFields);
      await subject.save();

      let subjects = await Subject.find({ exam: req.params.exam_id });
      res.json(subjects);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route PUT /api/subjects
//@desc   edit subject details
router.put('/:subject_id', auth, async (req, res) => {
  const { title, subjectTeacher } = req.body;

  try {
    // const subjects = await Subject.find({ exam: req.params.exam_id });

    const subject = await Subject.findById(req.params.subject_id);

    if (title) subject.title = `${title}`;
    if (subjectTeacher) subject.subjectTeacher = `${subjectTeacher}`;
    await subject.save();

    res.json(subject);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route DELETE /api/exams/:exam_id/subjects/:subject_id
//@desc  delete subject by subjectid
router.delete('/:subject_id', auth, async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.subject_id);
    res.json({ msg: 'Subject has been deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
