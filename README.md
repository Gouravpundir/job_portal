# Job Board Application

A server-side application for managing a job board for software developers. It provides the following features:

A user can create a new job posting by providing a title, description, and their email address. The user can also specify the required skills and experience level for the job.
A user can view a list of all current job postings, filtered by required skills and experience level.
A user can view the details of a specific job posting, including the title, description, required skills, experience level, and email address of the person who created the posting.
A user can apply for a job posting by providing their name, email, resume, and a cover letter. The cover letter should be in Markdown format.
A user who created a job posting can view a list of all the applications for that job, including the name, email, and cover letter of the applicant.

# Getting Started

# Prerequisites

1. Node.js and npm
2. MongoDB

# Installation

Clone the repository
https://github.com/Gouravpundir/job_portal.git

# Install the dependencies
npm install

# Start the application

1. npm start
2. Connect to the MongoDB
   mongo <dbname>

# API documentation
   
The application exposes a RESTful API for clients to access the job postings and applications.

Endpoints
POST /job-posting/:userId: Create a new job posting
GET /job-getAll: Get data of all the job posting
GET /job-posting/:Id: Get data of specific posting
GET /job-posting-query Get data with specific query
PUT /job-posting/:id/:userId Update data with specific job
DELETE /job-posting/:id/:userId Delete data with specific Id
POST /job-application: Create a new application
GET /job-application/:id: Get a list of all the applications for a job posting
Request and response examples
POST /login: Login user
POST /user: Create the user

# User

"fname":"Ram",
"lname":"Singh", 
"email":"ram5@gmail.com", 
"password":"ram22@" 
} 
# Login response  
{ 
"status": true, 
"message": "User login successfull", 
"data": { 
"userId": "63c26465f38f4a81eb8a15e5", 
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2MyNjQ2NWYzOGY0YTgxZWI4YTE1ZTUiLCJpYXQiOjE2NzM2OTg1NDAsImV4cCI6MTY3Mzc wMjE0MH0.Ku9C4hEXhC8CN6PbxCwJQRXSb9p1afrqDkzPkkfoH_o" 
} 
}

# Jop posting 
["\n\n"
{"\n\n"
"title": "Software Developer",
"description": "We are looking for a skilled software developer to join our team.",
"email": "ram@example.com",
"skills": ["JavaScript", "React", "Node.js"],
"experience": "entry", 
} 
] 

# Application 
{
  "jobId": "63c2781f1778588a2e19502f", 
    "name": "Ram", 
    "email": "ram123@example.com",
    "resume": "https://example.com/resume.pdf", 
    "coverLetter": "# Cover Letter\n\nI am writing to apply for the position of Software Developer at your company. I have 5 years of  experience in the field and am confident that I would be a valuable asset to your team." 
} 

# Response 

{
    "status": true, 
    "messege": "Success", 
    "Data": {"\n\n"
        "jobId": "63c2781f1778588a2e19502f", 
        "name": " Ram ","\n\n"
        "email": "ram123@example.com",
        "resume": "https://example.com/resume.pdf", 
        "coverLetter": "<h1>Cover Letter</h1>\n<p>I am writing to apply for the position of Software Developer at your company. I have 5 years of  experience in the  field and am confident that I would be a valuable asset to your team.</p>", 
        "_id": "63c2a949f1d6a09410e1ca30", "\n\n"
        "createdAt": "2023-01-14T13:08:25.055Z", 
        "updatedAt": "2023-01-14T13:08:25.055Z", 
        "__v": 0 
    } 
} 

# Known issues and bugs
None at the moment
