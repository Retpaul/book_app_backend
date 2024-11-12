import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publishedDate: {
      // type: Date,
      type: String,
      required: true,
    },
    description: String,

    rating: String,

    owner: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model("Book", bookSchema);
