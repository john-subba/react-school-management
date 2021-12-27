const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// call subject model
const Subjects = require('../../models/Subjects');

//@route  GET /api/subject
//@desc   get all the subjects
//@access Private
router.get('/', async (req, res) => {
  try {
    let subjects = await Subjects.find();

    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST /api/subject
//@desc   add subject
//@access Private
router.post(
  '/',
  auth,
  [
    check('subjectname', 'Subject name is required').not().isEmpty(),
    check('createdBy', 'CreatedBy field is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { subjectname, createdBy } = req.body;

    // initiate the subjects object
    const subjectFields = {};

    if (subjectname) subjectFields.subjectname = subjectname;
    if (createdBy) subjectFields.createdBy = createdBy;

    try {
      let subject = await Subjects.findOne({ subjectname });

      if (subject) {
        subject = await Subjects.findOneAndUpdate(
          { subjectname },
          { $set: subjectFields },
          { new: true }
        );
        return res.json(subject);
      }

      // create new subject
      subject = new Subjects(subjectFields);

      await subject.save();
      res.json(subject);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  POST /api/subject
//@desc   add subject
//@access Private

module.exports = router;
