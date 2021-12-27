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
    // this user:req.user.id also pertains to the token. i.e the id comes from token itself\
    // if you dont send token to this route the req.user.id will be undefined since id is coming from token itself
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
      return res.status(401).json({ errros: errors.array() });
    }

    const { department, position, address } = req.body;

    // new profile fields object we do this becuase there are multiple objects inside
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
      res.status(500).send('Server Failed');
    }
  }
);

// @route  GET api/profile
// @desc   Get all available profiles.
// @access Private
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'email']);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Failed');
  }
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by id
// @access Private
// here we dont need auth becuase we are sending the id from the request url(req.params.id)
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'email']);

    if (!profile) {
      return res.status(404).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Failed');
  }
});

// @route  DELETE api/profile
// @desc   Delete profile & user
// @access Private
// here we are not sending the id from the request url becuase inorder to delete user and profile user must be logged in i.e auth middleware where jwt token is checked is added. We get the id from the token
router.delete('/', auth, async (req, res) => {
  try {
    // delete the profile
    // req.user.id comes from token
    await Profile.findOneAndDelete({ user: req.user.id });

    // delete the user also
    await User.findOneAndDelete({
      _id: req.user.id,
    });

    res.json({ msg: 'User has been removed' });
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Failed');
  }
});

module.exports = router;
