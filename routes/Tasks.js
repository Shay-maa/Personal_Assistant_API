const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  checkUnCheckTask,
} = require("../controllers/Task");
const auth = require("../middlewares/auth");


router.get("/getTasks/:listId", auth, getTasks);
router.get("/getTask/:listId/:taskId", auth, getTask);
router.put("/addTask/:listId", auth, createTask);
router.put("/updateTask/:listId/:taskId", auth, updateTask);
router.delete("/deleteTask/:listId/:taskId", auth, deleteTask);
router.put("/checkTask/:listId/:taskId", auth, checkUnCheckTask);


module.exports = router;
