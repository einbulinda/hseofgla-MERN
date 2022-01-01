import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import mongoose from "mongoose";
import generateToken from "../utils/generateToken.js";

// @description     Register New User
// @route           POST /api/users/register
// @access          Public
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, photo } = req.body;

  const userExists = await User.findOne({ email });

  //   Check if user exists
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const newUser = await User.create({
    name: `${firstName} ${lastName}`,
    email,
    password,
    photo,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      photo: newUser.photo,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("An error ocurred during registration");
  }
});

// @description     Authenticate User
// @route           POST /api/users/login
// @access          Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      dob: user.dob,
      isAdmin: user.isAdmin,
      photo: user.photo,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @Description     Update User Profile
// @route           POST /api/users/update
// @access          Private
export const updateUser = asyncHandler(async (req, res) => {
  const { _id, name, contact, dob, email, photo } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No user with ID ${_id} found.`);

  const updatedInfo = { _id: _id, name, contact, dob, email, photo };
  await User.findByIdAndUpdate(_id, updatedInfo, { new: true });
  res.json(updatedInfo);
});
