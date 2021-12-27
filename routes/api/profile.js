const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//@route    GET /api/users
//@desc     get all the users
//@access   public
router.get('/', (req, res) => {
  res.send('Profile route');
});

module.exports = router;
