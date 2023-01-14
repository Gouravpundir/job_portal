const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId
const ApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: ObjectId,
      ref: "JobPosting",
      required:true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    resume: {
      type: String,
      required: true,
      trim: true,
    },
    coverLetter: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
