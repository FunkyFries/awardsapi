import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import students from "./routes/students";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));

mongoose
  .connect("mongodb://localhost/awardsapi", {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error(err.message));

app.use("/students", students);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
