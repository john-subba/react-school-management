const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');

// call user model
const User = require('../../models/User');
// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/teacher', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const index = user.teachers
      .map((teacher) => teacher.id)
      .indexOf(req.teacher.id);

    const teacher = user.teachers[index];
    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST /api/auth
//@desc     login user
//@access   public
router.post(
  '/',
  [
    check('email', 'Please include an valid email address').isEmail(),
    check('password', 'Password is required').exists(),
    check('isAdmin', 'isAdmin value is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { email, password, isAdmin, userName } = req.body;

    if (isAdmin === false) {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return res
            .status(404)
            .json({ msg: 'There is no school for this user' });
        }

        const index = user.teachers
          .map((teacher) => teacher.userName)
          .indexOf(userName);

        const teacher = user.teachers[index];

        const isMatch = await bcrypt.compare(password, teacher.password);

        if (!isMatch) {
          return res.status(401).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
          user: {
            id: user.id,
          },
          teacher: {
            id: teacher.id,
            isAdmin: teacher.isAdmin,
          },
        };

        jwt.sign(payload, config.get('jwtSecret'), (error, token) => {
          if (error) throw error;
          res.json({ token });
        });
      } catch (err) {
        console.error(err.message);
        res.status(401).send('Invalid Credentials');
      }
    }

    if (isAdmin === true) {
      try {
        const { email, password, isAdmin } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({ msg: 'Invalid Credentials' });
        }

        if (user.isAdmin !== isAdmin) {
          return res.status(401).json({ msg: 'Invalid Admin Credentials' });
        }

        const payload = {
          user: {
            id: user.id,
            isAdmin: user.isAdmin,
          },
        };

        jwt.sign(payload, config.get('jwtSecret'), (error, token) => {
          if (error) throw error;
          res.json({ token });
        });
      } catch (err) {
        console.error(err.message);
        res.status(400).send('Server error');
      }
    }
  }
);

module.exports = router;
