import Joi from "@hapi/joi";
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
      type: String,
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

function validateStudent(student) {
  const schema = {
    name: Joi.string().required(),
    grade: Joi.string().required(),
    teacher: Joi.string().required(),
    awards: Joi.array()
  };
  return Joi.validate(student, schema);
}

function validateUpdate(student) {
  const schema = {
    name: Joi.string(),
    grade: Joi.string(),
    teacher: Joi.string(),
    awards: Joi.array()
  };
  return Joi.validate(student, schema);
}

export { Student, validateStudent, validateUpdate };
