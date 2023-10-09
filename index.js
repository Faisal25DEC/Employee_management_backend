const express = require("express");
const connection = require("./config/db");
const todosRouter = require("./routes/todos.routes");
const usersRouter = require("./routes/users.routes");
const cors = require("cors");
//app
const app = express();

//env
require("dotenv").config();

//port
const port = process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("basic api endpoint");
});
app.use("/users", usersRouter);
app.use("/todos", todosRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("database connected");
    console.log("server started");
  } catch (err) {
    console.log(err);
  }
});
