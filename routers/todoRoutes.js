const router = require("express").Router();
const todoContoroller = require("../controllers/todoController");

// get all todo
router.get("/", todoContoroller.getAllTodos);

// creat todo
router.post("/", todoContoroller.createTodo);

// update todo
router.put("/:id", todoContoroller.updateTodo);

// delete todo
router.delete("/:id", todoContoroller.deleteTodo);

module.exports = router;