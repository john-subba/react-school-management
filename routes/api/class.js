const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// call class model
const Class = require('../../models/Class');

router.get('/', auth, async (req, res) => {
  try {
    const classDetails = await Class.find();

    res.json(classDetails);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
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
});

router.put('/:class_id', auth, async (req, res) => {
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
});

router.post('/section/:class_id', auth, async (req, res) => {
  const { sectionName } = req.body;

  const newSection = {
    sectionName,
  };

  try {
    let classDetails = await Class.findById(req.params.class_id);

    classDetails.section.push(newSection);
    await classDetails.save();
    res.json(classDetails);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

router.put('/section/:section_id', auth, async (req, res) => {
  const { studentsName, studentsRoll } = req.body;

  const newStudents = {
    studentsName,
    studentsRoll,
  };

  try {
    let classDetails = await Class.findById(req.params.section_id);

    console.log(classDetails);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

module.exports = router;
