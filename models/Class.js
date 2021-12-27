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
  section: [
    {
      sectionName: {
        type: String,
        required: true,
      },
      students: [
        {
          studentsName: {
            type: String,
            required: true,
          },
          studentsRoll: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = Class = mongoose.model('class', ClassSchema);
