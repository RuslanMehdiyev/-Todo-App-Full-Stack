const express = require("express");
const { ToDoController } = require("../controllers/ToDoController");

const router = express.Router();

router.get("/", ToDoController.getAll);
router.post("/", ToDoController.post);
router.delete("/:id", ToDoController.delete);
router.patch("/:id", ToDoController.update);

module.exports = router;
