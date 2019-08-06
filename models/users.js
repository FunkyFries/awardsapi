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
      type: String,
      enum: ["K", "1", "2", "3", "4", "5", "6", "Specialist", "Admin"],
      required: true
    }
  })
);

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    password: Joi.string().required(),
    grade: Joi.enum().required()
  };
  return Joi.validate(user, schema);
}

export { User, validateUser };
