const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  classTitle: {
    type: String,
    required: true,
  },
  students: [
    {
      sectionName: {
        type: String,
        required: true,
      },
      studentsName: {
        type: String,
        required: true,
      },
      studentsRoll: {
        type: Number,
        required: true,
      },
      studentsGrading: {
        type: String,
      },
      studentsRemarks: {
        type: String,
      },
    },
  ],
});

module.exports = Class = mongoose.model('class', ClassSchema);
