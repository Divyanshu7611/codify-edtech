const mongoose = require("mongoose")

// Define the Assessment schema
const assessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          text: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            default: false,
          },
        },
      ],
      points: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalPoints: {
    type: Number,
    default: 0,
  },
  timeLimit: {
    type: Number, // in minutes
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  maxAttempts: {
    type: Number,
    default: 1,
  },
  instructions: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  allowTabSwitch: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Pre-save middleware to calculate total points
assessmentSchema.pre("save", function (next) {
  this.totalPoints = this.questions.reduce((total, question) => total + question.points, 0)
  this.updatedAt = Date.now()
  next()
})

// Export the Assessment model
module.exports = mongoose.model("Assessment", assessmentSchema)
