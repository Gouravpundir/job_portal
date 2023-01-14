const mongoose = require("mongoose");
const JobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
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
    requiredSkills: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    experienceLevel: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPosting", JobPostingSchema);
