const List = require("../models/Lists");

const createList = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const { name, color } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid name, can't be empty" });
    }
    const list = new List({ name, color, user: user.user_id });
    const savedList = await list.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "successfully retrieved ",
        list: savedList,
      });
    // const { name, color ,user} = req.body;
    // const list = new List({ name, color, user: user });
    // await list.save();
    // res.status(201).json({ success: true, data: list });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, error: "Server error", message: error.message });
  }
};

const getLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.user._id });
    res
      .status(200)
      .json({ success: true, message: "Successfully retrieved", data: lists });
  } catch (error) {
    res.status(401).json({ success: false, error: "Server error" });
  }
};

const getList = async (req, res) => {
  try {
    const list = await List.findById({
      _id: req.params.listId,
      user: req.user._id,
    }).populate("tasks");
    if (!list) {
      return res.status(404).json({ success: false, error: "List not found" });
    }
    res.json({ success: true, data: list });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const updateList = async (req, res) => {
  try {
    const { listId } = req.params;
    const { name, color } = req.body;
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({ success: false, error: "List not found" });
    }
    list.name = name;
    list.color = color;
    const editedList = await List.findByIdAndUpdate(listId, list);
    res.status(200).json({
      success: true,
      message: "Successfully edited list",
      data: list,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const deleteList = async (req, res) => {
  try {
    const list = await List.findByIdAndDelete({
      _id: req.params.listId,
      user: req.user._id,
    });
    if (!list) {
      return res.status(404).json({ success: false, error: "List not found" });
    }
    res
      .status(204)
      .json({
        success: true,
        message: "successfully deleted List",
        data: list,
      });
  } catch (error) {
    res.status(401).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
};
