import asyncHandler from "express-async-handler";
import { Book } from "../models/book.js";

//get user books
//Method - GET
//@private
//endpoint - /api/books
export const getBooks = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const books = await Book.find({
    owner: userId,
  });

  if (books.length < 1) {
    return res.status(204).json(books);
  }
  res.status(200).json(books);
});

//add user books
//Method -POST
//@private
//endpoint - /api/books
export const addBooks = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { title, author, publishedDate, genre, description } = req.body;
  if (!title || !author || !publishedDate || !genre) {
    res.status(400);
    throw new Error("Enter all required information");
  }

  const newBook = await Book.create({
    title,
    author,
    publishedDate,
    genre,
    description,
    owner: userId,
  });
  if (!newBook) {
    res.status(400);
    throw new Error("Failed to create book");
  }
  res.status(201).json(newBook);
});

//get single book
//Method - get
//@private
//endpoint - /api/books
export const getBook = asyncHandler(async (req, res) => {
  const params = req.params;
  const bookId = params.bookId;
  
  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(200).json(book);
});

//update user books
//Method - put
//@private
//endpoint - /api/books
export const updateBook = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const data = req.body;
  const params = req.params;
  const bookId = params.bookId;

  const updateBook = await Book.findByIdAndUpdate(
    bookId,
    { ...data },
    { new: true }
  );

  if (!updateBook) {
    res.status(400);
    throw new Error("Failed to update book");
  }
  res.status(201).json(updateBook);
});

//delete user book
//Method - delete
//@private
//endpoint - /api/books
export const deleteBook = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const params = req.params;
  const bookId = params.bookId;
  const deletedBook = await Book.findByIdAndDelete(bookId);
  if (!deletedBook) {
    res.status(400);
    throw new Error("Failed to delete book");
  }
  res.status(200).json({ message: "Successfully deleted book" });
});
