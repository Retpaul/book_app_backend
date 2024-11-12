import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { sendEmail } from "../email.js";

//Register user
//Method - Post
//@public
//endpoint - /api/auth/register

export const registerUser = asyncHandler(async (req, res) => {
  // console.log( req.body)
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please Input all required fields" });
  }
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (user) {
    return res
      .status(400)
      .json({ error: "User with this email or username already exists" });
  }

  const hashedPasword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPasword,
  });

  if (!newUser) {
    return res.status(400).json({ error: "Failed to create user Account" });
  }
  //   console.log(newUser)
  sendEmail(
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS,
    newUser.username,
    newUser.email,
    "Registration Successful"
  );

  return res.status(201).json({
    message: "User account succesfully created",
    data: { username: newUser.username, email: newUser.email },
  });
});

//User Login
//Method - Post
//@public
//endpoint - /api/auth/login

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ error: "Please Input email and password" });
  }
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status(404).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 10 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.status(200).json({ message: "Successfully Logged in" });
});

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
