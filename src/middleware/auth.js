const jwt = require("jsonwebtoken");

//==========================authentication=============================//
const authentication = function (req, res, next) {
  try {
    const token = req.headers["x-api-key"];
    // token validation.
    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: `token must be present` });
    }
    //Seting userId in headers for Future Use
    else {
      jwt.verify(token, "Secret-Key", function (err, data) {
        if (err) {
          return res.status(400).send({ status: false, message: err.message });
        } else {
          req.userId = data.userId;
          next();
        }
      });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


module.exports = {authentication}