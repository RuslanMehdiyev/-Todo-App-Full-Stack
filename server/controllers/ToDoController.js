const { ToDo } = require("../model/ToDoModel");

const ToDoController = {
  post: (req, res) => {
    let newTodo = new ToDo({
      text: req.body.text,
    });
    newTodo.save((err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  getAll: (req, res) => {
    ToDo.find({ isDeleted: false }, (err, docs) => {
      if (!err) {
        res.status(200).json(docs);
      } else {
        res.status(500).json(err);
      }
    });
  },
  delete: (req, res) => {
    let id = req.params.id;
    ToDo.findByIdAndUpdate(id, { isDeleted: true }, (err, doc) => {
      if (!err) {
        res.status(200).json(doc);
      } else {
        res.status(500).json(err);
        console.log(err);
      }
    });
  },
  update: (req, res) => {
    let id = req.params.id;
    ToDo.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true },
      (err, doc) => {
        if (!err) {
          res.status(201).json(doc);
        } else {
          console.log(err.message);
          res.status(500).json(err.message);
        }
      }
    );
  },
};

module.exports = {
  ToDoController,
};
