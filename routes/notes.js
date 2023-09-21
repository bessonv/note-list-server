import express from "express";
import { Deta } from "deta";

const deta = Deta();
const db = deta.Base("notes");
const router = express.Router();

router.get("/", async (req, res) => {
  const allItems = await db.fetch({});
  return res.json(allItems);
});

router.post("/", async (req, res) => {
  const { name, description, created } = req.body;
  const toCreate = {
    name,
    description,
    created: new Date(created).getTime()
  };
  const insertedTodo = await db.put(toCreate);
  res.status(201).json(insertedTodo);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const note = await db.get(id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "note not found" });
  }
});

router.get("/search/:str", async (req, res) => {
  const { str } = req.params;
  const { items } = await db.fetch([
    { "name?contains": str },
    { "description?contains": str },
  ]);
  return res.json(items);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, created } = req.body;
  const toPut = {
    key: id,
    name,
    description,
    created: new Date(created).getTime()
  };
  const newItem = await db.put(toPut);
  return res.json(newItem);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.delete(id);
  res.json({ message: "deleted" });
});

export { router } 
