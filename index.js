import express, { json } from "express";
import cors from "cors";
import { router as notesRouter } from "./routes/notes.js";

const port = process.env.PORT;
const app = express();

app.use(cors({
  origin: (process.env.NODE_ENV === 'development')
    ? '*' 
    : 'https://bessonv.github.io/react-note-app/'
}));

app.use(json());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/notes", notesRouter);

app.listen(port, () => {
  console.log(`backend running on port ${port}!`);
});

export default app;
