const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/db");
const authRouter = require("./routes/authRouter");
const bodyParser = require("body-parser");
const productRouter = require("./routes/productRouter");
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
