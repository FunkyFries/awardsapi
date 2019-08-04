import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
