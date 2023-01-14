const jobPostingModel = require("../Models/jobPostingModels");

const {
  isVAlidEmail,
  isValidRequestBody,
  isValidObjectId,
} = require("../validation");

//-------------Create a new job posting---------------//

const createJobPosting = async (req, res) => {
  try {
    // Validate the request body
    const { title, description, email, requiredSkills, experienceLevel } =
      req.body;
    if (!isValidRequestBody(req.body)) {
      return res
        .status(400)
        .send({ status: false, error: `Request body can't be empty` });
    }
    if (!title) {
      return res.status(400).send({ error: `Title is required` });
    }
    if (!description) {
      return res.status(400).send({ error: `Description is required` });
    }
    if (!email) {
      return res.status(400).send({ error: `Email is required` });
    }
    if (!isVAlidEmail(email)) {
      return res.status(400).send({ error: `Please provide valid E-mail` });
    }
    //  checking if email is unique or not.
    let checkEmail = await jobPostingModel.findOne({ email: email });
    if (checkEmail) {
      return res.status(400).send({ message: `Email Already Registered...` });
    }
    if (req.params.userId != req.userId){
      return res.status(403).send({status:false,error:`Not authorized user`})
    }
    if (
      !requiredSkills ||
      !Array.isArray(requiredSkills) ||
      requiredSkills.length === 0
    ) {
      return res.status(400).send({ error: `Required skills are required` });
    }
    if (
      !experienceLevel ||
      !["entry", "intermediate", "expert"].includes(experienceLevel)
    ) {
      return res.status(400).send({ error: `Invalid experience level` });
    }
    // Create a new job posting
    const jobPosting = await jobPostingModel.create({
      title,
      description,
      email,
      requiredSkills,
      experienceLevel,
    });
    res
      .status(201)
      .send({ status: true, message: `Success`, data: jobPosting });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

//--------------------Get a list of Job By Query------------------//

const getJobByQuery = async (req, res) => {
  try {
    // Get pagination and filter params
    const { page, limit, requiredSkills, experienceLevel } = req.query;
    // parse pagination parameters and set defaults
    const paginationOptions = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };
    // Build the query
    const query = {};
    // if requiredSkills are provided in the query, add them to the query
    if (requiredSkills) {
      query.requiredSkills = { $in: requiredSkills.split(",") };
    }
    // if experienceLevel is provided in the query, add it to the query
    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }
    // Get the job postings
    const jobPostings = await jobPostingModel
      .find(query)
      .skip((paginationOptions.page - 1) * paginationOptions.limit) // skip pages
      .limit(paginationOptions.limit) // limit number of results
      .sort({ createdAt: -1 }); // sort by latest first
    res
      .status(200)
      .send({ status: true, message: `Success`, data: jobPostings });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//--------------------Get a list of Job By Id------------------//

const getJobPostings = async (req, res) => {
  try {
    // Validate the request parameters
    if (!isValidObjectId(req.params.id)) {
      res.status(400).send({ message: `Invalid user id` });
      return;
    }

    // Get the user with the specified id
    const getData = await jobPostingModel.findById(req.params.id);
    if (!getData) {
      res.status(404).send({ message: `User not found` });
      return;
    }
    res.status(200).send({ status: true, message: `Success`, data: getData });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//--------------------Get a list of Get All Jobs Posted------------------//

const getAllJobPosting = async (req, res) => {
  try {
    // Find all job postings in the database
    const jobPostings = await jobPostingModel.find();
    // Send the job postings to the client
    res
      .status(200)
      .send({ status: true, messege: `Success`, data: jobPostings });
  } catch (error) {
    // Handle any errors that may occur
    res.status(500).send({
      message: error.message,
    });
  }
};

//--------------------Update Jobs List------------------//

const updateJobPosting = async (req, res) => {
  if (!isValidRequestBody(req.body)) {
    return res
      .status(400)
      .send({ status: false, error: `Request body can't be empty` });
  }
  if (
    !req.body.title &&
    !req.body.description &&
    !req.body.email &&
    !req.body.requiredSkills &&
    !req.body.experienceLevel
  ) {
    return res
      .status(400)
      .send({
        status: false,
        message: `Please provide at least one field to update`,
      });
  }
  if (req.params.userId != req.userId){
    return res.status(403).send({status:false,error:`Not authorized user`})
  }
  // Update job posting
  try {
    const updatedJobPosting = await jobPostingModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updatedJobPosting);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//--------------------Delete Job By Id------------------//

const deleteById = async (req, res) => {
  try {
    // input validation
    if (!req.params.id) {
      return res.status(400).send({
        message: `Please provide job posting id`,
      });
    }
    if (req.params.userId != req.userId){
      return res.status(403).send({status:false,error:`Not authorized user`})
    }
    // Find the job posting to delete
    const jobPosting = await jobPostingModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!jobPosting)
      return res
        .status(404)
        .send(`The job posting with the given ID was not found.`);

    // Send a message to the client indicating that the job posting was deleted
    res.send({
      message: `Job posted was deleted successfully!`,
    });
  } catch (error) {
    // Handle any errors that may occur
    res.status(500).send({
      message: error.message,
    });
  }
};


module.exports = {createJobPosting, getAllJobPosting, getJobPostings, getJobByQuery, updateJobPosting, deleteById}