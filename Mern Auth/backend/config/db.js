const mongoose = require("mongoose");

const mongo_URI = process.env.MONGO_URI;
// mongoose
//   .connect(mongo_URI)
//   .then(() => {
//     console.log("MongoDB is Connected");
//   })
//   .catch((error) => {
//     console.log("MongoDB Error", error);
//   });

const connectWithRetry = () => {
  console.log("MongoDB connection with retry");
  mongoose
    .connect(mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
      console.error("MongoDB Connection Error:", err);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};
connectWithRetry();
