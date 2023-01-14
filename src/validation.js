const mongoose = require("mongoose");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length > 0) return true;
  return false;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isVAlidEmail = function (email) {
  return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);
};

const isValidPassword = function (password) {
  password = password.trim();
  if (password.length < 8 || password.length > 15) {
    return false;
  }
  return true;
};

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

module.exports = {
  isVAlidEmail,
  isValidRequestBody,
  isValidPassword,
  isValidObjectId,
  isValid,
};
