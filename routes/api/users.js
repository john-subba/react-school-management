const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// calling user model
const User = require('../../models/User');

// @route Req Type: POST Endpoint api/users
// @desc register user to the dataBase
// @acess value is public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include an valid email address').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('schoolName', 'School Name is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure from req.body
    const { name, email, password, schoolName, schoolAddress, schoolPhoneNo } =
      req.body;

    try {
      // see if user exists already we give error
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ erros: [{ msg: 'User already exsits' }] });
      }

      // get user gravatar(avatar)
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
        schoolName,
        schoolAddress,
        schoolPhoneNo,
      });

      // encrypt the password using bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return JWT so that user gets logged in right away after creating the account
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server error');
    }
  }
);

//@route    GET /api/users
//@desc     gett all of the users
//@access   public
router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

module.exports = router;
