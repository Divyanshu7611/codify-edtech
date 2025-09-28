const mongoose = require("mongoose")

// Define the AssessmentResult schema
const assessmentResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assessment",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  answers: [
    {
      questionIndex: {
        type: Number,
        required: true,
      },
      selectedOptionIndex: {
        type: Number,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
      points: {
        type: Number,
        required: true,
      },
    },
  ],
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPoints: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
    default: 0,
  },
  timeTaken: {
    type: Number, // in minutes
    required: true,
  },
  attemptNumber: {
    type: Number,
    required: true,
    default: 1,
  },
  startedAt: {
    type: Date,
    required: true,
  },
  submittedAt: {
    type: Date,
    required: true,
  },
  tabSwitches: {
    type: Number,
    default: 0,
  },
  warnings: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["In Progress", "Completed", "Abandoned"],
    default: "In Progress",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Pre-save middleware to calculate percentage
assessmentResultSchema.pre("save", function (next) {
  this.percentage = this.totalPoints > 0 ? (this.score / this.totalPoints) * 100 : 0
  next()
})

// Export the AssessmentResult model
module.exports = mongoose.model("AssessmentResult", assessmentResultSchema)
