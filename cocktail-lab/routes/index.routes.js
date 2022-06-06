const router = require("express").Router();
const Cocktail = require("../models/Cocktail.model.js");


/* GET home page */
router.get("/", async (req, res, next) => {
  const cocktailAlcToShow = await Cocktail.find({category:"Alcoholic"}, null, {limit: 6})
  const cocktailNAlcToShow = await Cocktail.find({category:"Non alcoholic"}, null, {limit: 6})
  //console.log(cocktailToShow)
  res.render("index", {cocktailAlcToShow,cocktailNAlcToShow});
});

module.exports = router;
