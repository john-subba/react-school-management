const mongoose = require('mongoose');
const Student = require('./Student');

const ClassSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'exam',
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
  },
  classTitle: {
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
