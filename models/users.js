import Joi from "@hapi/joi";
import mongoose from "mongoose";

const User = mongoose.model(
  "Users",
  new mongoose.Schema({
    name: {
      type: String
    },
    grade: {
      type: String,
      enum: ["K", "1", "2", "3", "4", "5", "6", "Specialist", "Admin"]
    },
    email: {
      type: String
    },
    profileId: {
      type: String
    }
  })
);

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    grade: Joi.enum().required(),
    email: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

export { User, validateUser };
