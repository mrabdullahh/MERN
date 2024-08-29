const express = require("express");
require("dotenv").config();
const connectDB = require("./Config/db");
const taskRouter = require("./Routes/taskRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
connectDB();
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser());
app.use("/tasks", taskRouter);
app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.listen(PORT, () => {
  console.log("Server is running on Port = ", PORT);
});
