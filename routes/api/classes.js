const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Class = require('../../models/Class');

//@route  /api/classes/:subject_id
//@desc   get the classes of the subject
router.get('/:subject_id', auth, async (req, res) => {
  try {
    const classDetail = await Class.find({ subject: req.params.subject_id });

    res.json(classDetail);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  /api/classes/:subject_id
//@desc   add class according to subject id
router.post(
  '/:exam_id/:subject_id',
  [
    check('classTitle', 'Class title is required').not().isEmpty(),
    check('studentsNumber', 'Number of students is required'),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { classTitle, studentsNumber } = req.body;

    const classFields = {};
    classFields.exam = req.params.exam_id;
    classFields.subject = req.params.subject_id;
    if (classTitle) classFields.classTitle = classTitle;
    if (studentsNumber) classFields.studentsNumber = studentsNumber;

    try {
      let classes = await Class.find({ subject: req.params.subject_id });

      classes = new Class(classFields);
      await classes.save();

      let classList = await Class.find({ subject: req.params.subject_id });
      res.json(classList);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  /api/classes/:subject_id
//@desc   edit class details
router.put('/:class_id', auth, async (req, res) => {
  try {
    const { classTitle, studentsNumber } = req.body;

    const classDetails = await Class.findById(req.params.class_id);

    if (classTitle) classDetails.classTitle = `${classTitle}`;
    if (studentsNumber) classDetails.studentsNumber = `${studentsNumber}`;

    await classDetails.save();
    res.json(classDetails);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  /api/classes/:class_id
//@desc   delete class details
router.delete('/:subject_id/:class_id', auth, async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.class_id);

    let classes = await Class.find({ subject: req.params.subject_id });
    res.json(classes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  /api/classes/:class_id/section
//@desc   add section details
router.post(
  '/:class_id/section',
  [check('sectionName', 'Section Name is required').not().isEmpty()],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { sectionName } = req.body;

    const newSection = {
      sectionName,
    };
    try {
      const classDetail = await Class.findById(req.params.class_id);

      const section = classDetail.sections;

      section.push(newSection);

      await classDetail.save();
      res.json(classDetail);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  /api/classes/:class_id/section
//@desc   delete section and all of its data
router.delete('/:class_id/section/:section_id', auth, async (req, res) => {
  try {
    const classDetail = await Class.findById(req.params.class_id);

    const index = classDetail.sections
      .map((section) => section.id)
      .indexOf(req.params.section_id);

    classDetail.sections.splice(index, 1);

    await classDetail.save();
    res.json(classDetail);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  /api/classes/:class_id/sections/:section_id/students
//@desc   add students details to class by class id
router.post(
  '/:class_id/sections/:section_id/students',
  [
    check('studentName', 'Student Name is required').not().isEmpty(),
    check('studentRoll', 'Student Roll number is required').not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { studentName, studentRoll, studentGrading, studentRemarks } =
        req.body;
      let sectionId = req.params.section_id;
      const newSubject = {
        studentName,
        studentRoll,
        studentGrading,
        studentRemarks,
        sectionId,
      };

      const reqClass = await Class.findById(req.params.class_id);

      const index = reqClass.sections
        .map((section) => section.id)
        .indexOf(req.params.section_id);

      const section = reqClass.sections[index];

      section.students.push(newSubject);

      await reqClass.save();
      res.json(reqClass);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  /api/classes/:class_id/sections/:section_id/students/:student_id
//@desc   edit students details like grading and remarks
router.put(
  '/:class_id/sections/:section_id/students/:student_id',
  auth,
  async (req, res) => {
    const { studentGrading, studentRemarks } = req.body;

    try {
      const reqClass = await Class.findById(req.params.class_id);

      const index = reqClass.sections
        .map((section) => section.id)
        .indexOf(req.params.section_id);

      const section = reqClass.sections[index];

      const stuIndex = section.students
        .map((stu) => stu.id)
        .indexOf(req.params.student_id);

      const student = section.students[stuIndex];
      if (studentGrading) student.studentGrading = `${studentGrading}`;
      if (studentRemarks) student.studentRemarks = `${studentRemarks}`;

      await reqClass.save();
      res.json(section);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  /api/classes/:class_id/sections/:section_id/students/:student_id
//@desc   edit students details like grading and remarks
router.delete(
  '/:class_id/sections/:section_id/students/:student_id',
  auth,
  async (req, res) => {
    try {
      const reqClass = await Class.findById(req.params.class_id);

      const index = reqClass.sections
        .map((section) => section.id)
        .indexOf(req.params.section_id);

      const section = reqClass.sections[index];

      const stuIndex = section.students
        .map((stu) => stu.id)
        .indexOf(req.params.student_id);

      section.students.splice(stuIndex, 1);

      await reqClass.save();

      res.json(section);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
