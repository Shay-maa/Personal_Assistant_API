const Diary = require("../models/diary");


// Create diary entry
exports.creatDiary = async (req, res) => {
  try {
    const diary = await Diary.create(req.body);
    res.status(200).json(diary);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all diaries
exports.getDiaries = async (req, res) => {
  try {
    const diaries = await Diary.find({});
    res.status(200).json(diaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get diary by id
exports.getDiary = async(req, res) => {
  try{
    const {id} = req.params;
    const diary = await Diary.findById(id);
       if (!diary) {
         return res
           .status(404)
           .json({ success: false, error: "Diary not found" });
       }
       res.json({ success: true, data: diary });


  }catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Delete diary by id
exports.deleteDiary = async(req, res) => {
  try{
    const {id} = req.params;
    const diary = await Diary.findByIdAndDelete(id);
    if (!diary) {
      return res.status(404).json({ success: false, error: "Diary not found" });
    }
    res.json({ success: true, data: diary });

  }catch (error) {
    res.status(500).json({message: error.message});
  }
};

