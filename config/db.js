const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://faizaljohnson25dec:faisal@cluster0.utjpulc.mongodb.net/fseval-todo"
);

module.exports = connection;
