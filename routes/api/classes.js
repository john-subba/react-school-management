const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Exam = require('../../models/Exam');

//@route  /api/classes/:subject_id
//@desc   add class to the subject
router.post(
  '/:exam_id/:subject_id',
  [
    check('title', 'Class Title is required').not().isEmpty(),
    check('studentsNumber', 'Subject Total Number is required').not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, studentsNumber } = req.body;

    const subject = req.params.subject_id;
    const newClass = {
      title,
      studentsNumber,
      subject,
    };

    try {
      const exam = await Exam.findById(req.params.exam_id);

      const index = exam.subjects
        .map((subject) => subject.id)
        .indexOf(req.params.subject_id);

      const subject = exam.subjects[index];

      subject.classes.push(newClass);
      await exam.save();
      res.json(exam);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);
