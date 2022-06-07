const router = require("express").Router();
const Cocktail = require("../models/Cocktail.model.js");


/* GET home page */
router.get("/", async (req, res, next) => {
  
  res.render("index");
});

module.exports = router;
