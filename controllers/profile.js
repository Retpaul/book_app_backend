import asyncHandler from "express-async-handler";
import { User } from "../models/user.js";

import bcrypt from "bcryptjs";

//get user profile
//Method - get
//@private
//endpoint - /api/profile

export const getUserProfile = asyncHandler(async (req, res) => {
  const data = req.user;
  if (!data) {
    res.status(400);
    throw new Error("Failed to get user");
  }
  res.status(200).json(data);
});

//update user profile
//Method - put
//@private
//endpoint - /api/profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // console.log(userId)
  const { password, ...data } = req.body;
  // console.log(password, data);
  const user = await User.findOne({
    $or: [{ email: data.email }, { username: data.username }],
  });
  if (user) {
    return res
      .status(400)
      .json({ error: "This email or username has already been used" });
  }

  if (password) {
    const hashedPasword = await bcrypt.hash(password, 10);
    // console.log(hashedPasword)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...data,
        password: hashedPasword,
      },
      { new: true }
    );
    if (!updatedUser) {
      res.status(400);
      throw new Error("Failed to update user Account");
    }
    return res.status(201).json({
      message: "User profile updated successfully",
      data: { username: updatedUser.username, email: updatedUser.email },
    });
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      ...data,
    },
    { new: true }
  );

  if (!updatedUser) {
    res.status(400);
    throw new Error("Failed to update user Account");
  }
  return res.status(201).json({
    message: "User profile updated successfully",
    data: { username: updatedUser.username, email: updatedUser.email },
  });
});

//delete user profile
//Method - delete
//@private
//endpoint - /api/profile
export const deleteUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  const deletUser = await User.findByIdAndDelete(userId);
  if (!deletUser) {
    res.status(400);
    throw new Error("Failed to delete user Account");
  }
  return res.status(204).json({
    message: "User profile deleted successfully",
  });
});
