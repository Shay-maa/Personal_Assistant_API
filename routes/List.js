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

router.post("/", auth, createList);
router.get("/", auth, getLists);
router.get("/:id", auth, getList);
router.put("/:id", auth, updateList);
router.delete("/:id", auth, deleteList);

module.exports = router;