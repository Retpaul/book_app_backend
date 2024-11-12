import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const verifyUser = asyncHandler(async (req, res, next) => {
  let token;

  try {
    token = await req.cookies.jwt;
    if (!token) {
      res.status(401);
      throw new Error("Unauthourized access");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const findUser = await User.findById(decoded.userId).select("-password");
    if (!findUser) {
      res.status(404);
      throw new Error("User not found");
    }
    req.user = findUser;
// console.log(req.user)
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized");
  }
});
