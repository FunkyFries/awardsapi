import mongoose from "mongoose";

const Student = mongoose.model(
  "Students",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    teacher: {
      required: true
    },
    grade: {
      type: String,
      enum: ["K", "1", "2", "3", "4", "5", "6"],
      required: true
    },
    awards: {
      type: Array
    }
  })
);
