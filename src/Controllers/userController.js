const userModel = require('../Models/userModel');
const bcrypt = require("bcrypt");

const {
  isVAlidEmail,
  isValidRequestBody,
  isValidPassword,
} = require("../validation");

//-----------------create user-----------------------//

const createUser = async (req, res) => {
  try {
    const { fname,email, password } = req.body;
    if (!isValidRequestBody(req.body)) {
      return res
        .status(400)
        .send({ status: false, error: `Request body can't be empty` });
    }
    if (!fname) {
      return res
        .status(400)
        .send({ status: false, error: `First name is required` });
    }
    //validate email
    if (!email) {
      return res
        .status(400)
        .send({ status: false, error: `Email is required` });
    }
    if (!isVAlidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, error: `Invalid email format` });
    }
    // validate password
    if (!password) {
      return res
        .status(400)
        .send({ status: false, error: `Password is required` });
    }
    if (!isValidPassword(password)) {
      return res.status(400).send({
        status: false,
        error: `Password must be at least 8 characters`,
      });
    }

    // check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: `Email already exists` });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create user
    const user = await userModel.create({ email, password: hashedPassword });
    res
      .status(201)
      .send({ status: true, message: `User created successfully`, data: user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { createUser };
