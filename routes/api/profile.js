const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// call profile model
const Profile = require('../../models/Profile');

//@route    GET /api/profile
//@desc     get all the profiles of the users
//@access   public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();

    res.json({ profiles });
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

//@route    POST /api/profile/me
//@desc     get all the profiles of the users
//@access   public
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'email']
    );

    if (!profile) {
      return res.status(404).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

//@route    POST /api/profile
//@desc     add profile acc to the user id
//@access   public
router.post(
  '/',
  auth,
  [
    check('department', 'Please state from which department are you')
      .not()
      .isEmpty(),
    check('position', 'Please state your position at your department')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { department, position, address } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id;
    if (department) profileFields.department = department;
    if (position) profileFields.position = position;
    if (address) profileFields.address = address;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server error');
    }
  }
);

//@route    GET /api/profile/subject
//@desc     get the subjects of the profile
//@access   public
router.get('/subject', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    const subjectsList = profile.subjects;
    res.json({ subjectsList });
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

//@route    POST /api/profile/subject
//@desc     add subject to the profile
//@access   public
router.post(
  '/subject',
  auth,
  [
    check('title', 'Subject title is required').not().isEmpty(),
    check('subjectTeacher', 'Subject Teacher is required').not().isEmpty(),
  ],
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
      let profile = await Profile.findOne({ user: req.user.id });

      profile.subjects.push(newSubject);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server error');
    }
  }
);

//@route    Delete /api/profile/subject/:sub_id
//@desc     delete subject by its id
//@access   private
router.delete('/subject/:sub_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.subjects
      .map((sub) => sub.id)
      .indexOf(req.params.sub_id);

    profile.subjects.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

module.exports = router;
