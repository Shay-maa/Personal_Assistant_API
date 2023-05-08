const express = require("express");
const router = express.Router();
const {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
} = require("../controllers/Lists");
const auth = require("../middlewares/auth");

router.post("/createList", auth, createList);
router.get("/getLists", auth, getLists);
router.get("/getList/:listId", auth, getList);
router.put("/updateList/:listId", auth, updateList);
router.delete("/deleteList/:listId", auth, deleteList);

module.exports = router;