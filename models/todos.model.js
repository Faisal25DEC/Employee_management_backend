const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  status: { type: Boolean, required: true },
  tag: { type: String, required: true },
  userId: { type: String, required: true },
});

const TodoModel = mongoose.model("todos", todoSchema);

module.exports = TodoModel;
