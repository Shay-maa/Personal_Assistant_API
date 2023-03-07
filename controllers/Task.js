const Task = require("../models/Tasks");
const List = require("../models/Lists");
const createTask = async (req, res) => {
  try {
    const { name, description , dueDate, priority  } = req.body;
    const task = new Task({
      name,
      description,
      dueDate,
      priority,
      list: req.params,
      user: req.user._id,
    });
    await task.save();
    const list2 = await List.findOneAndUpdate(
      { _id: req.params },
      { $push: { tasks: task } }
    );
    if(!list2){
      return res.status(404).json({ message: "List not found" });
    }
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const { listId } = req.params;
    const tasks = await Task.find({ list: listId });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById({
      _id: req.params.id,
      user: req.user._id,
    }).populate("list");
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }
    res.json({ success: true, data: task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};