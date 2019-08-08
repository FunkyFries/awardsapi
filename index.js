import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import students from "./routes/students";
import auth from "./routes/auth";
import passport from "passport";
import cookieSession from "cookie-session";

const passportConfig = require("./config/auth");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost/awardsapi", {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error(err.message));

app.use(
  cookieSession({
    secret: process.env.SESSION_SECRET,
    name: "session",
    httpOnly: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("tiny"));

app.use("/students", students);
app.use("/auth", auth);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
