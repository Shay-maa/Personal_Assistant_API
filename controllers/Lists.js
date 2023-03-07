const List = require('../models/Lists');

const createList = async (req, res) => {
  try {
    const { name, color ,user} = req.body;
    const list = new List({ name, color, user: user });  
    await list.save();
    res.status(201).json({ success: true, data: list });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.user._id });
    res.json({ success: true, data: lists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getList = async (req, res) => {
  try {
    const list = await List.findById({
      _id: req.params.id,
      user: req.user._id,
    }).populate("tasks");
    if (!list) {
      return res.status(404).json({ success: false, error: 'List not found' });
    }
    res.json({ success: true, data: list });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const updateList = async (req, res) => {
  try {
    const list = await List.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!list) {
      return res.status(404).json({ success: false, error: 'List not found' });
    }
    res.json({ success: true, data: list });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const deleteList = async (req, res) => {
try {
const list = await List.findByIdAndDelete({_id: req.params.id , user: req.user._id});
if (!list) {
return res.status(404).json({ success: false, error: 'List not found' });
}
res.status(204).json({ success: true, data: {} });
} catch (error) {
console.error(error);
res.status(500).json({ success: false, error: 'Server error' });
}
};

module.exports = {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
};