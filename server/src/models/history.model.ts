import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    totalTests: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalTime: {
      type: Number,
      default: 0,
      min: 0,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      rel: "user",
    },
    completedTests: [
      {
        type: mongoose.Types.ObjectId,
        rel: "compltedTest",
      },
    ],
  },
  { timestamps: true }
);

const historyModel = mongoose.model("history", historySchema);

export default historyModel;
