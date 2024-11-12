import { Schema, model } from "mongoose";

const {ObjectId} = Schema.Types;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    books: [{
        type: ObjectId,
        ref: "Book",
      }],
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
