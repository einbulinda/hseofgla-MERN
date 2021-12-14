import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";

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
    });
  } else {
    res.status(400);
    throw new Error("An error ocurred during registration");
  }
});
