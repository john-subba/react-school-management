const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
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
        default: Date.now,
      },
      subjectTeacher: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
