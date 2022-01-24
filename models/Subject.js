const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'exam',
  },
  subjectTitle: {
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
});

module.exports = Subject = mongoose.model('subject', SubjectSchema);
