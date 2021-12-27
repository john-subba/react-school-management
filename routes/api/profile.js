const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// call profile model
const Profile = require('../../models/Profile');

// @route  GET api/profile/me
// @desc   get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    // the req.user.id comes from the objectID inside of the Profile model.
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
    res.status(500).send('Server Failed');
  }
});

// @route  POST api/profile
// @desc   Create or Update profile
// @access Private
router.post(
  '/',
  auth,
  [
    check('department', 'Please state which department are you in')
      .not()
      .isEmpty(),
    check('position', 'Please state which position are you in').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { department, position, address } = req.body;

    // new profile fields
    const profileFields = {};

    // this is the user that is in the Profile model (user : objectID) and we are filling that user field with the user data from user model with the help of req.user.id to find the specific user.
    profileFields.user = req.user.id;

    if (department) profileFields.department = department;
    if (position) profileFields.position = position;
    if (address) profileFields.address = address;

    try {
      // find if there is profile for that user or not.
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // if there is profile we update here
        // here we need to update the profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // create new profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Failed');
    }
  }
);

module.exports = router;
