const mongoose = require('mongoose');

const StudentSchema = {
  class: mongoose.Schema.Types.ObjectId,
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
};

module.exports = StudentSchema;
