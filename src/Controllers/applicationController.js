const jobPostingModel = require("../Models/jobPostingModels");
const ApplicationModel = require("../Models/applicationModel");
const {isVAlidEmail}= require('../validation')
const marked = require('marked');
const applicationModel = require("../Models/applicationModel");

//----------------Apply for a job posting------------------//

const applyForJob = async (req, res) => {
  // Input validation
  if (
    !req.body.jobId ||
    !req.body.name ||
    !req.body.email ||
    !req.body.resume ||
    !req.body.coverLetter
  ) {
    return res.status(400).send({ message: `Missing required fields` });
  }
  if(!isVAlidEmail(req.body.email)){
    return res.status(400).send({message: `E-mail is not valid`})
  }
      //  checking if email is unique or not.
      let checkEmail = await applicationModel.findOne({ email: req.body.email });
      if (checkEmail) {
        return res.status(400).send({ message: `Email Already Registered...` });
      }
  //Check if job posting exists
  const job = await jobPostingModel.findById(req.body.jobId);
  if (!job) {
    return res.status(404).send({ message: `Job posting not found` });
  }
  try {
    //Create new job application
    const application = await ApplicationModel.create({
      jobId: req.body.jobId,
      name: req.body.name,
      email: req.body.email,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter,
    });
    res
      .status(201)
      .send({ status: true, messege: `Success`, Data: application });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//--View a list of all the applications for a specific job posting--//

const applicationForJobs = async (req, res) => {
  // Check if job posting exists
  const jobPosting = await jobPostingModel
    .findById(req.params.id);
  if (!jobPosting) {
    return res.status(404).send({ message: `Job posting not found` });
  }

  // Retrieve all the applications for the job posting
  try {
    const jobApplications = await ApplicationModel.find({
      jobId: jobPosting._id,
    });
    res
      .status(200)
      .send({ status: true, messege: `Success`, Data: jobApplications });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { applicationForJobs, applyForJob };
