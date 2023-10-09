const express = require("express");
const { authenticate } = require("../middleware/authenticate");
const TodoModel = require("../models/todos.model");

const todosRouter = express.Router();
todosRouter.use(authenticate);

const checkQuery = (req, res, next) => {
  const { status, tag } = req.query;
  let query = {};
  if (status) {
    query["status"] = status == "done" ? true : false;
  }
  if (tag) {
    query["tag"] = tag;
  }
  req.queryObj = query;
  next();
};

todosRouter.get("/", checkQuery, async (req, res) => {
  try {
    const { queryObj } = req;
    queryObj["userId"] = req.userId;
    console.log(queryObj);
    console.log(req.userId);
    const todos = await TodoModel.find(queryObj);
    res.send({ loggedIn: true, todos: todos });
  } catch (err) {
    res.status(404).send("todos not found");
  }
});
todosRouter.get("/:todoId", async (req, res) => {
  const { todoId } = req.params;
  try {
    console.log(req.userId);
    const todo = await TodoModel.findOne({ _id: todoId });
    res.send({ loggedIn: true, todo: todo });
  } catch (err) {
    res.status(404).send("todo not found");
  }
});

todosRouter.post("/create", async (req, res) => {
  const { title, tag } = req.body;
  const userId = req.userId;
  try {
    await TodoModel.create({ title, tag, userId, status: false });
    res.send("todo created successfully");
  } catch (err) {
    res.status(400).send("erorr creating todos");
  }
});
todosRouter.put("/update/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const payload = req.body;
  const userId = req.userId;
  try {
    await TodoModel.findByIdAndUpdate(todoId, payload);
    res.send("todo updated successfully");
  } catch (err) {
    res.status(400).send("erorr creating todos");
  }
});

todosRouter.delete("/delete/:todoId", async (req, res) => {
  const { todoId } = req.params;

  const userId = req.userId;
  try {
    await TodoModel.findByIdAndDelete(todoId);
    res.send("todo deleted successfully");
  } catch (err) {
    res.status(400).send("erorr creating todos");
  }
});
module.exports = todosRouter;
