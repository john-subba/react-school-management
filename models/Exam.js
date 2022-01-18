const mongoose = require('mongoose');

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
      classes: [
        {
          classTitle: {
            type: String,
            required: true,
          },
          sections: [
            {
              sectionTitle: {
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
            },
          ],
        },
      ],
    },
  ],
});

module.exports = Exam = mongoose.model('exam', ExamsSchema);
