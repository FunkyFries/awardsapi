import express from "express";
import { Student, validateStudent, validateUpdate } from "../models/students";
const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
  const students = await Student.find().sort("name");
  res.send(students);
});

// Get one student
router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) return res.status(404).send("Student not found.");

  res.send(student);
});

// Create a new student
router.post("/", async (req, res) => {
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = new Student({
    name: req.body.name,
    teacher: req.body.teacher,
    grade: req.body.grade
  });
  await student.save();

  res.send(student);
});

// Update student
router.put("/:id", async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = await Student.findOneAndUpdate(
    req.params.id,
    {
      awards: req.body.awards
    },
    { new: true }
  );

  if (!student) return res.status(404).send("Student not found.");

  res.send(student);
});

// Delete student
router.delete("/:id", async (req, res) => {
  const student = await Student.findOneAndRemove(req.params.id);

  if (!student) return res.status(404).send("Student not found.");

  res.send(student);
});

export default router;
