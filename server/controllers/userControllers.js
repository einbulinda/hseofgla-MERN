import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModal from "../models/userModels.js";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;

export const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await UserModal.findOne({ email });

    //   Check if user exists
    if (userExists)
      return res
        .status(400)
        .json({ message: "User with that email already exists." });

    //   Hash the user password
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Error ocurred with user creation" });
    console.log(error);
  }
});
