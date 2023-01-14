const express = require("express");
const router = express.Router();
const applicationController= require('../Controllers/applicationController')
const jobPostingController= require('../Controllers/JobPostingController')
const loginController= require('../Controllers/loginController')
const userController= require('../Controllers/userController')
const auth = require('../middleware/auth')

//job posting routes

router.post('/job-posting/:userId',auth.authentication,jobPostingController.createJobPosting)
router.get('/job-getAll',jobPostingController.getAllJobPosting)
router.get('/job-posting/:id',jobPostingController.getJobPostings)
router.get('/job-posting-query',jobPostingController.getJobByQuery)
router.put('/job-posting/:id/:userId',auth.authentication, jobPostingController.updateJobPosting)
router.delete('/job-posting/:id/:userId',auth.authentication,jobPostingController.deleteById)


//application posting routes
router.post('/job-application',applicationController.applyForJob)
router.get('/job-application/:id',applicationController.applicationForJobs)


//login routes

router.post('/login', loginController.loginUser)

//user routes
router.post('/user',userController.createUser)



module.exports = router;