const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// call user model
const User = require('../../models/User');

router.post(
  '/',
  [
    check('name', 'Name field is required').not().isEmpty(),
    check('email', 'Email field is required').isEmail(),
    check('password', 'Please enter atleast 6 characters').isLength({ min: 6 }),
    check('isAdmin', 'Please check wether you are admin or not').isBoolean(),
  ],
  async (req, res) => {
    // check errors from express validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    // destructure props from req.body
    const { name, email, password, isAdmin } = req.body;

    try {
      // check if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
        isAdmin,
      });

      // generate salt and hash the password with the salt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // get token after users is saved and logged in

      // we want the token to carry the user info after getting logged in
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtsecret'),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
