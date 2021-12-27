const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//call user model
const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Failed');
  }
});

module.exports = router;
