const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const Auth = require("../models/authModel");

const login = asyncHandler(async (req, res) => {
  // Validate the request body
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find the user by email
  let user = await Auth.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  // Validate the password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  // Generate a JWT token and send it to the client
  const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECERT, {
    expiresIn: "1h",
  });
  res.send(token);
});

const register = asyncHandler(async (req, res) => {
  // Validate the request body
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user already exists
  let user = await Auth.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  // Hash the password and create a new user
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user = new Auth({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  // Generate a JWT token and send it to the client
  const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECERT, {
    expiresIn: "1h",
  });
  res.send(token);
});

module.exports = {
  login,
  register,
};
