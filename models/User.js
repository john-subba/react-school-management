const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  schoolAddress: {
    type: String,
  },
  schoolPhoneNo: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  teachers: [
    {
      name: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      subjects: [
        {
          title: {
            type: String,
            required: true,
          },
          createdDate: {
            type: Date,
            default: Date.now(),
          },
          subjectTeacher: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

// 'user' is the model name and UserSchema is the usermodel which we have created abv
module.exports = User = mongoose.model('user', UserSchema);
