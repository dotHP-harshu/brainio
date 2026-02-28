import mongoose from "mongoose";

const completedTestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      rel: "user",
    },
    title: {
      type: String,
    },
    result: {
      type: String,
    },
    resultLabel: {
      type: String,
    },
    correctAnswers: {
      type: Number,
    },
    totalQuestions: {
      type: Number,
    },
    type: {
      type: String,
    },
    timeSpent: {
      type: Number,
    }, // in seconds
    accuracyRate: {
      type: Number,
    },
    aiInsight: {
      type: String,
    },
  },
  { timestamps: true }
);

const completedTestModel = mongoose.model("completedTest", completedTestSchema);
export default completedTestModel;
