const Todo = require("../models/todoModel");

// get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// create todos
exports.createTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = new Todo({ task, user: req.user._id });
    await newTodo.save();
    console.log("todo created");
    res.status(201).json({ message: "Todo created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update todo
exports.updateTodo = async (req, res) => {
  try {
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log("data update");
    res.status(201).json(updateTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete todo
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    console.log("todo deleted");
    res.status(200).json({ message: "todo deleted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
