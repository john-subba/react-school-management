const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// call class model
const Class = require('../../models/Class');

//@route    GET /api/class
//@desc     get all the classes
//@access   public
router.get('/', auth, async (req, res) => {
  try {
    const classes = await Class.find();

    if (classes.length === 0) {
      return res
        .status(404)
        .json({ msg: 'There are no any classes added to this subject' });
    }

    res.json({ classes });
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

//@route    POST /api/class
//@desc     add classes
//@access   public
router.post(
  '/',
  auth,
  [check('classTitle', 'Class Title is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { classTitle } = req.body;

    const classFields = {};

    classFields.user = req.user.id;

    if (classTitle) classFields.classTitle = classTitle;

    try {
      let classDetails = await Class.findOne({ user: req.user.id });

      classDetails = new Class(classFields);

      await classDetails.save();
      res.json(classDetails);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server error');
    }
  }
);

//@route    PUT /api/class/:class_id
//@desc     change the name of class with the help of finding the class by its id
//@access   public
router.put(
  '/:class_id',
  auth,
  [check('classTitle', 'Class Title is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { classTitle } = req.body;

    const newClass = {
      classTitle,
    };

    try {
      const classDetails = await Class.findOneAndUpdate(
        req.params.class_id,
        { $set: newClass },
        { new: true }
      );

      await classDetails.save();
      res.json(classDetails);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server error');
    }
  }
);

//@route    Delete /api/class/:class_id
//@desc     Delete the whole class using class id
//@access   public
router.delete('/:class_id', auth, async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.class_id);

    res.json({ msg: 'Your class has been removed' });
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

//@route    POST /api/class/students/:class_id
//@desc     add students according to their respective class. Find class by its id.
//@access   public
router.post(
  '/students/:class_id',
  [
    check('sectionName', 'Name of section is required').not().isEmpty(),
    check('studentsName', 'Students Name is required').not().isEmpty(),
    check('studentsRoll', 'Students Roll Number is required').not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { studentsName, studentsRoll, sectionName } = req.body;

    const newStudents = {
      studentsName,
      studentsRoll,
      sectionName,
    };

    try {
      let classDetails = await Class.findById(req.params.class_id);

      classDetails.students.push(newStudents);
      await classDetails.save();
      res.json(classDetails);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server error');
    }
  }
);

//@route    GET /api/class/:class_id
//@desc     get specific class by its id
//@access   public
router.get('/:class_id', auth, async (req, res) => {
  try {
    const classDetails = await Class.findById(req.params.class_id);

    res.json(classDetails);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

//@route    PUT /api/class/students/:student_id
//@desc     change students credentials according to the id of students
//@access   public
router.put('/students/:class_id/:student_id', auth, async (req, res) => {
  const {
    studentsName,
    studentsRoll,
    sectionName,
    studentsGrading,
    studentsRemarks,
  } = req.body;

  try {
    const classDetails = await Class.findById(req.params.class_id);

    // get index of the student that we edit the credentials of
    const studentIndex = classDetails.students
      .map((stu) => stu.id)
      .indexOf(req.params.student_id);

    // we use the index that we get in the studentIndex and in our students array we use that index to grab the specific student that comes with the student_id in the request url. Then according to its field we change the required field
    classDetails.students[studentIndex].sectionName = `${sectionName}`;
    classDetails.students[studentIndex].studentsRoll = `${studentsRoll}`;
    classDetails.students[studentIndex].studentsGrading = `${studentsGrading}`;
    classDetails.students[studentIndex].studentsRemarks = `${studentsRemarks}`;
    classDetails.students[studentIndex].studentsName = `${studentsName}`;

    await classDetails.save();
    res.json(classDetails);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

//@route    Delete /api/class/students/:student_id
//@desc     delete particular student by getting index of the student inside studnets array with the help of student array
//@access   private
router.delete('/students/:class_id/:student_id', auth, async (req, res) => {
  try {
    const classDetails = await Class.findById(req.params.class_id);

    // get index of the student that we are deleting
    const removeIndex = classDetails.students
      .map((stu) => stu.id)
      .indexOf(req.params.student_id);

    classDetails.students.splice(removeIndex, 1);

    await classDetails.save();
    res.json(classDetails);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

module.exports = router;
