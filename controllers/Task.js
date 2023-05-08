const Task = require("../models/Tasks");
const List = require("../models/Lists");
const createTask = async (req, res) => {
  try {
    const {listId}= req.params;
    // const { name, description , dueDate, priority  } = req.body;
    // const task = new Task({
    //   name,
    //   description,
    //   dueDate,
    //   priority,
    //   listId,
    //   user
    // });
    // await task.save();
    // const list = await List.findOneAndUpdate(
    //   { _id: req.params },
    //   { $push: { tasks: task } }
    // );
    const list = await List.findById(listId);
    if(!list){
      return res.status(404).json({ message: "List not found" });
    }
    list.tasks.push({ name: req.body.name, taskupdatedAt: new Date() });
    await List.findByIdAndUpdate(listId,list);

    res.status(201).json({ success: true, message :"Task successfully added",data: list });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getTasks = async (req, res) => {
  try {
     const { listId } = req.params;
    // const tasks = await Task.find({ list: listId });
    // res.status(200).json({ success: true, data: tasks });
    const checkListExists =  await List.findById(listId);
    if (!checkListExists) {
      return res.status(404).json({ message: "List not found" });
    }
    const list = await List.findById(listId);
    const tasks = list.tasks;
    res
      .status(200)
      .json({
        success: true,
        message: "tasks successfully retrieved",
        data: tasks,
      });


  } catch (error) {
    //console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getTask = async (req, res) => {
  try {
    const { listId, taskId } = req.params;
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    const task = list.tasks.filter((e) => e._id == taskId);
    if (task.length == 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ success: true, data: task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const checkUnCheckTask = async(req,res)=>{
  try{
    const { listId , taskId} = req.body;
    const list =  await List.findById(listId);
    if(!list){
      res.status(404).json({message:"List not found"});
    }
    const checkTaskExist = list.tasks.filter((e) => e._id == taskId);

    if(!checkTaskExist){
      res.status(404).json({message:"Task not found"});
    }
    const updatedTasks = list.tasks.map(e=>{
      if(e._id == taskId){
        if(e.completed){
          e.completed = false;
        }else{
            e.completed =  true;
          }
          return e;
  }
  else{
    return e;
  }})
}
  catch(error){
    res.status(500).json({ message: "Server error" });
  }
}
const updateTask = async (req, res) => {
  try {
    const {listId , taskId} = req.params;
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    const checkTaskExist = list.tasks.filter(e=>e._id == taskId);
    if (checkTaskExist.length == 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const updatedTasks = list.tasks.map(e=>{
      if(e._id == taskId){
        e.name= req.body.name;
        e.description= req.body.description;
        e.completed= req.body.completed;
        e.taskupdatedAt = new Date();
        return e;
    }
    else return e;
  })
  list.tasks =  updatedTasks;
  await List.findByIdAndUpdate(listId , list  );
    res.status(200).json({ list });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
}

const deleteTask = async (req, res) => {
  try {
    const {listId,taskId} = req.params;
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
  //   const list = await List.findById(listId);

    const checkTaskExist = list.tasks.filter((e) => e._id == taskId);
    if(checkTaskExist.length == 0){
      return res.status(404).json({ message: 'Task not found' });
    }
    // const task = await Task.findOneAndDelete({
    //   _id: req.params.id,
    //   user: req.user._id,
    // });
    // if (!task) {
    //   return res.status(404).json({ message: 'Task not found' });
    // }
    const updatedTasks = list.tasks.filter(e=>e._id != taskId ); 
    list.tasks = updatedTasks;
    const updatedList = await List.findByIdAndUpdate(listId , list);
    res
      .status(200)
      .json({
        success: true,
        message: "Task deleted successfully",
        list,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  checkUnCheckTask
};