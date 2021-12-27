const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');

// clal user model
const User = require('../../models/User');

//@route    GET /api/users
//@desc     get all the users
//@access   public
router.post(
  '/',
  auth,
  [
    check('email', 'Please include an valid email address').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
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
);

module.exports = router;
