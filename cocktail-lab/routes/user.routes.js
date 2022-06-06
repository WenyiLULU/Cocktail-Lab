const router = require("express").Router();

const Cocktail = require("../models/Cocktail.model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("user/profile"); // to do: change view page with Kat
});

router.get("/create-cocktail", //:middleware//, 
    (req, res, next) =>{
    res.render("user/createCocktail");     
})
router.post("/create-cocktail", //:middleware//, 
    async(req, res, next) =>{    
    const {name, category, ingredient, amount, steps} = req.body
    let ingredients = [];
    for(let i=0; i<ingredient.length; i+=1){
        ingredients.push({ingredient:ingredient[i], amount:amount[i]})
    }
    //console.log("new cocktail input ==>>>", {name, category, ingredient, amount, steps}) 
    const newCocktail = await Cocktail.create({
        name,
        category,
        ingredients: ingredients,
        steps
    })
    //console.log(newCocktail)
    res.redirect("/");   
})
module.exports = router;

// // for "main" profile page:
// router.get('/userProfile/main', isLoggedIn, (req, res) => {
//   res.render('users/main', { userInSession: req.session.currentUser });
// });
// // for "private" profile page:
// router.get('/userProfile/private', isLoggedIn, (req, res) => {
//   res.render('users/private', { userInSession: req.session.currentUser });
// });