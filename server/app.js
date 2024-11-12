import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"
import { notFound } from "./middlewares/error.js"
import { error } from "./middlewares/error.js"
import authRoutes from "./routes/auth.js"
import profileRoutes from "./routes/profile.js"
import bookRoutes from "./routes/books.js"


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser()); 
app.use(cors()); 

app.use("/api/auth",authRoutes)
app.use("/api/profile",profileRoutes)
app.use("/api/books",bookRoutes)

app.use(notFound)
app.use(error)
export default app
