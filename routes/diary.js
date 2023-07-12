const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");


const {
  creatDiary,
  getDiaries,
  getDiary,
  deleteDiary,
} = require("../controllers/diary");


router.post("/", auth, creatDiary);
router.get("/",auth, getDiaries);
router.get("/:id",auth, getDiary);
router.delete("/:id",auth, deleteDiary);

module.exports = router;
