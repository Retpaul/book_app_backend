import express from "express"
import { registerUser, userLogin } from "../controllers/auth.js"

const router = express.Router()


router.post("/register",registerUser)
router.post("/login",userLogin)

export default router