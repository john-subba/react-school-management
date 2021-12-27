const mongoose = require('mongoose');

const SubjectsSchema = new mongoose.Schema({
  subjectname: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  modifiedBy: {
    type: String,
    required: true,
  },
  class: [
    {
      name: {
        type: String,
        required: true,
      },
      section: [
        {
          name: {
            type: String,
            required: true,
          },
          studentsCategory: [
            {
              name: {
                type: String,
                required: true,
              },
              rollNumber: {
                type: Number,
                required: true,
              },
              grading: {
                type: String,
                required: true,
              },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = Subjects = mongoose.model('subjects', SubjectsSchema);
