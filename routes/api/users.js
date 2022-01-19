const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

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
    check('schoolDesc', 'School Description is required').not().isEmpty(),
    check('isAdmin', 'isAdmin value is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure from req.body
    const {
      name,
      email,
      password,
      schoolName,
      schoolAddress,
      schoolPhoneNo,
      schoolDesc,
      isAdmin,
    } = req.body;

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
        schoolDesc,
        isAdmin,
      });

      // encrypt the password using bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return JWT so that user gets logged in right away after creating the account
      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
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
//@desc     get all of the users
//@access   public
router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route    GET /api/users/me
//@desc     get current user
//@access   public
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST /api/users/teachers
//@desc   add teacher users to the main school user schema so that teacher also can have acces to data of the school
router.post(
  '/teachers',
  auth,
  [
    check('name', 'Teacher Name is required').not().isEmpty(),
    check('userName', 'Please include an Username').not().isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('schoolName', 'School Name is required').not().isEmpty(),
    check('isAdmin', 'isAdmin value is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, schoolName, userName, password, isAdmin } = req.body;

    try {
      const mainUser = await User.findById(req.user.id);

      const user = req.user.id;

      const avatar = gravatar.url({
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      const newTeacher = {
        user,
        name,
        schoolName,
        userName,
        password,
        isAdmin,
        avatar,
      };

      const salt = await bcrypt.genSalt(10);

      newTeacher.password = await bcrypt.hash(password, salt);

      mainUser.teachers.push(newTeacher);
      await mainUser.save();
      res.json(mainUser);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  DELETE /api/users/teachers
//@desc   Delete the teacher **this route will be available for main user only
router.delete('/teachers/:teacher_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const index = user.teachers
      .map((teacher) => teacher.id)
      .indexOf(req.params.teacher_id);

    user.teachers.splice(index, 1);

    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
