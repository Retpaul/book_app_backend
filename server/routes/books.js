import express from "express";
import { verifyUser } from "../middlewares/auth.js";
import {
  addBooks,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/book.js";

const router = express.Router();

router.route("/").get(verifyUser, getBooks).post(verifyUser, addBooks);

router
  .route("/:bookId")
  .get(verifyUser, getBook)
  .put(verifyUser, updateBook)
  .delete(verifyUser, deleteBook);
export default router;
