import express from "express";

import { verifyUser } from "../middlewares/auth.js";
import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../controllers/profile.js";

const router = express.Router();

router
  .route("/")
  .get(verifyUser, getUserProfile)
  .put(verifyUser, updateUserProfile)
  .delete(verifyUser, deleteUserProfile);

export default router;
