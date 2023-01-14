const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const { isVAlidEmail, isValid, isValidPassword } = require("../validation");
const bcrypt = require('bcrypt')

//-------------------login user-------------------//

const loginUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length === 0)
      return res
        .status(400)
        .send({ status: false, error: `Body can't be empty` });

    let { email, password } = data;

    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: `Email is required !!` });
    }

    if (!isVAlidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: `Enter valid email` });
    }

    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: `Invalid password !!` });
    }

    if (!isValidPassword(password)) {
      return res.status(400).send({
        staus: false,
        message: `Length of the password must be between 8 to 15 charaxters`,
      });
    }

    let findPassword = await userModel.findOne({ email: email });
    let passwordData = await bcrypt.compare(password, findPassword.password);
    if (!passwordData) {
      return res
        .status(400)
        .send({ status: false, message: `Invalid credentials` });
    }

    let userid = await userModel.findOne({
      email: email,
      password: findPassword.password,
    });

    // creating Token
    let token = jwt.sign(
      {
        userId: userid._id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      "Secret-Key"
    );
    let obj = {
      userId: userid._id,
      token: token,
    };

    return res
      .status(200)
      .send({ status: true, message: `User login successfull`, data: obj });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

module.exports.loginUser = loginUser;
