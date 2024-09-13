const ensuresAuthenticated = require("../middlewares/Auth");

const router = require("express").Router();

router.get("/", ensuresAuthenticated, (req, res) => {
  // console.log("Logged In User", req.user);

  res.json([
    {
      name: "mobile",
      price: "25000",
    },
    {
      name: "Laptop",
      price: "40000",
    },
  ]);
});

module.exports = router;
