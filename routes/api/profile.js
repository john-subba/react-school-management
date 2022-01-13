const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// call profile model
const Profile = require('../../models/Profile');
const Class = require('../../models/Class');

//@route    GET /api/profile/me
//@desc     get the profile of current user
//@access   public
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['email']
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
    check('name', 'Please enter your name').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { department, position, address, name } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id;
    if (department) profileFields.department = department;
    if (position) profileFields.position = position;
    if (address) profileFields.address = address;
    if (name) profileFields.name = name;

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

module.exports = router;
