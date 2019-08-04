import Joi from "@hapi/joi";
import mongoose from "mongoose";

const User = mongoose.model(
  "Users",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    grade: {
      enum: ["K", "1", "2", "3", "4", "5", "6", "Specialist", "Admin"],
      required: true
    }
  })
);

export default User;
