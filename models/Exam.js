const mongoose = require('mongoose');
const Subject = require('./Subject');

const ExamsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  fromDate: {
    type: String,
    required: true,
  },
  toDate: {
    type: String,
    required: true,
  },
  // subjects: [Subject],
});

module.exports = Exam = mongoose.model('exam', ExamsSchema);
