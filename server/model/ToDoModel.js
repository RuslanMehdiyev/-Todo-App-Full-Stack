const { Schema, default: mongoose } = require("mongoose");

const TodoSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  text: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const ToDo = mongoose.model("ToDo", TodoSchema);
module.exports = {
  ToDo,
};
