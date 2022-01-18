const mongoose = require('mongoose');
const Student = require('./Student');

const ClassSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'exam'
  }
  title: {
    type: String,
    requireed: true,
  },
  studentsNumber: {
    type: Number,
    required: true,
  },
  sections: [
    {
      sectionName: {
        type: String,
        required: true,
      },
      students: [Student],
    },
  ],
});

module.exports = Class = mongoose.model('class', ClassSchema);
