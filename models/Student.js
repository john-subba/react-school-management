const mongoose = require('mongoose');

const StudentSchema = {
  sectionId: mongoose.Schema.Types.ObjectId,
  studentName: {
    type: String,
    required: true,
  },
  studentRoll: {
    type: Number,
    required: true,
  },
  studentGrading: {
    type: String,
  },
  studentRemarks: {
    type: String,
  },
};

module.exports = StudentSchema;
