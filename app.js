const express = require("express");
const listsRouter = require("./routes/List");
const tasksRouter = require("./routes/Tasks");
const usersRouter = require("./routes/User");
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
const { errorHandler } = require('./middlewares/errorHandler');
const connectDB = require('./db/connection')
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/lists", listsRouter);
app.use("/tasks", tasksRouter);
app.use("/auth", usersRouter);

app.use(errorHandler);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(`look for error ${error}`);
  }
};
start();



