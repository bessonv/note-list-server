import express, { json } from "express";
import cors from "cors";
import { router as notesRouter } from "./routes/notes.js";

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(json());

app.get("/", cors(), (req, res) => res.send("Hello World!"));

app.use("/notes", notesRouter);

app.listen(port, () => {
  console.log(`backend running on port ${port}!`);
});

export default app;
