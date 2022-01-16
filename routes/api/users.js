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
          email: user.email,
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

//@route  GET /api/teachers
//@desc   Get all the teachers of that user only
//@access Private
router.get('/teachers', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const teachers = user.teachers;
    res.json({ teachers });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

//@route  GET /api/users/teachers/:teacher_id
//@desc   get specific teacher by its id
//@access Private
router.get('/teachers/:teacher_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const getIndex = user.teachers
      .map((teacher) => teacher.id)
      .indexOf(req.params.teacher_id);

    const teacher = user.teachers[getIndex];

    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

//@route  POST /api/teachers
//@desc   add teacher to the user
//@access Private
router.post(
  '/teachers',
  [
    check('name', 'Teacher Name field is required').not().isEmpty(),
    check('department', 'Department field is required').not().isEmpty(),
    check('position', 'Position field is required').not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { name, department, position, address } = req.body;

    const newTeacher = {
      name,
      department,
      position,
      address,
    };

    try {
      const user = await User.findById(req.user.id);

      user.teachers.push(newTeacher);

      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(400).json('Server Error');
    }
  }
);

//@route  PUT /api/teachers/:teacher_id
//@desc   change details of specific teacher
//@access Private
router.put('/teachers/:teacher_id', auth, async (req, res) => {
  const { name, department, position, address } = req.body;

  try {
    const user = await User.findById(req.user.id);

    // find the index of the object in teachers array to match it with the teacher_id
    const getIndex = user.teachers
      .map((teacher) => teacher.id)
      .indexOf(req.params.teacher_id);

    const teacher = user.teachers[getIndex];

    if (name) teacher.name = `${name}`;
    if (department) teacher.department = `${department}`;
    if (position) teacher.position = `${position}`;
    if (address) teacher.address = `${address}`;

    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

//@route  DELETE /api/users/teachers/:teacher_id
//@desc   delete teacher using teacher id also delete subject under the teacher
//@access Private
router.delete('/teachers/:teacher_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // find the index of the object in teachers array to match it with the teacher_id
    const getIndex = user.teachers
      .map((teacher) => teacher.id)
      .indexOf(req.params.teacher_id);

    user.teachers.splice(getIndex, 1);

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Failed');
  }
});

//@route  GET /api/teachers/:teacher_id/subjects
//@desc   get all of the subjects of that teacher
//@access Private
router.get('/teachers/:teacher_id/subjects', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const getIndex = user.teachers
      .map((teacher) => teacher.id)
      .indexOf(req.params.teacher_id);

    const teacher = user.teachers[getIndex];

    const subjectsList = teacher.subjects;

    res.json({ subjectsList });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

//@route  POST /api/users/teachers/:teacher_id/subjects
//@desc   add subjects to the teacher
//@access Private
router.post(
  '/teachers/:teacher_id/subjects',
  [
    check('title', 'Title of subject is required').not().isEmpty(),
    check('subjectTeacher', 'Subject Teacher field is required')
      .not()
      .isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { title, subjectTeacher } = req.body;

    const newSubject = {
      title,
      subjectTeacher,
    };

    try {
      const user = await User.findById(req.user.id);

      const getIndex = user.teachers
        .map((teacher) => teacher.id)
        .indexOf(req.params.teacher_id);

      const teacher = user.teachers[getIndex];

      const subjectList = teacher.subjects;

      subjectList.push(newSubject);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  PUT /api/teachers/:teacher_id/subjects/:subject_id
//@desc   Edit details of the specific subject of the specific teacher
//@access Private
router.put(
  '/teachers/:teacher_id/subjects/:subject_id',
  [
    check('title', 'Title of subject is required').not().isEmpty(),
    check('subjectTeacher', 'Subject Teacher field is required')
      .not()
      .isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { title, subjectTeacher } = req.body;

    try {
      const user = await User.findById(req.user.id);

      // find the index of the object in teachers array to match it with the teacher_id
      const getIndex = user.teachers
        .map((teacher) => teacher.id)
        .indexOf(req.params.teacher_id);

      const teacher = user.teachers[getIndex];

      const subjectList = teacher.subjects;

      // get the index of subject array using the subject id
      const subjectIndex = subjectList
        .map((subject) => subject.id)
        .indexOf(req.params.subject_id);

      const subject = subjectList[subjectIndex];

      if (title) subject.title = `${title}`;
      if (subjectTeacher) subject.subjectTeacher = `${subjectTeacher}`;

      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  DELETE /api/teachers/:teacher_id/subjects/:subject_id
//@desc   Delete the subject of the specific teacher of specific user
//@access Private
router.delete(
  '/teachers/:teacher_id/subjects/:subject_id',
  auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      // find the index of the object in teachers array to match it with the teacher_id
      const getIndex = user.teachers
        .map((teacher) => teacher.id)
        .indexOf(req.params.teacher_id);

      const teacher = user.teachers[getIndex];

      const subjectList = teacher.subjects;

      // get the index of subject array using the subject id
      const subjectIndex = subjectList
        .map((subject) => subject.id)
        .indexOf(req.params.subject_id);

      subjectList.splice(subjectIndex, 1);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
