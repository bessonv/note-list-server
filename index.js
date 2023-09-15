const express = require("express");
const cors = require("cors");
const { Deta } = require("deta");

const deta = Deta();
const db = deta.Base("notes");
const app = express();
app.use(cors({
  origin: (process.env.NODE_ENV === 'development')
    ? '*' 
    : 'https://bessonv.github.io/react-note-app/'
}));
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/notes", async (req, res) => {
  const allItems = await db.fetch({});
  return res.json(allItems);
});

app.post("/notes", async (req, res) => {
  const { name, description, created } = req.body;
  const toCreate = { name, description, created };
  const insertedTodo = await db.put(toCreate);
  res.status(201).json(insertedTodo);
});

app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const note = await db.get(id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "note not found" });
  }
});

app.get("/search-by-str/:str", async (req, res) => {
  const { str } = req.params;
  const { items } = await db.fetch([
    { "name?contains": str },
    { "description?contains": str },
  ]);
  return res.json(items);
});

app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, created } = req.body;
  const toPut = { key: id, name, description, created };
  const newItem = await db.put(toPut);
  return res.json(newItem);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await db.delete(id);
  res.json({ message: "deleted" });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`backend running on port ${port}!`);
});

module.exports = app;
