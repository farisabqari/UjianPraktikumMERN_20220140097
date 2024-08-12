//rute todo
import express from "express";
const router = express.Router();
import Todo from "../models/Todo.js";

//mendapatkan semua todo
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//menambahkan todo baru
router.post("/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    completed: false, // Atur status awal menjadi belum selesai
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//memperbarui todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) return res.status(404).json({ message: "Todo tidak ditemukan" });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//menghapus todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo tidak ditemukan" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
