const router = require("express").Router();
const Cocktail = require("../models/Cocktail.model.js");


/* GET home page */
router.get("/", async (req, res, next) => {
  const cocktailAlcToShow = await Cocktail.find({category:"Alcoholic"}, null, {limit: 6})
  const cocktailNAlcToShow = await Cocktail.find({category:"Non alcoholic"}, null, {limit: 6})
  //console.log(cocktailAlcToShow[0].id)
  res.render("index", {cocktailAlcToShow,cocktailNAlcToShow});
});
router.get("/details/:id", async (req, res) => {
  const cocktailOnClick = await Cocktail.findById(req.params.id)
  const {name, category, ingredients, image, id} = cocktailOnClick
  res.render("users/details-public",{name, category, ingredients, image, id})
})
router.get("/list/:category", async (req, res) => {
  const categories = ["Non alcoholic", "Alcoholic"]
  const categoryChoosed = categories[req.params.category]
  const cocktailList = await Cocktail.find({category: categoryChoosed})
  res.render('users/all-cocktails',{cocktailList,categoryChoosed})
})

module.exports = router;
