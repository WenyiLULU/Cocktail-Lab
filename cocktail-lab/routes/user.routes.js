const router = require("express").Router();

const Cocktail = require("../models/Cocktail.model.js");

const { isLoggedIn, isLoggedOut } = require('../middleware/route.guard.js');


/* GET home page */
router.get("/profile", isLoggedIn, (req, res, next) => {
    
    res.render("users/profile", { userInSession: req.session.currentUser}); 
});

router.get("/create-cocktail", isLoggedIn, 
    (req, res, next) =>{
    res.render("users/createCocktail");     
})
router.post("/create-cocktail", isLoggedIn, 
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

// private profile
// router.get("/details-private", isLoggedIn, 
//     (req, res, next) =>{
//     res.render("users/details-private");     
// })

router.get("/details-private/:id", isLoggedIn, async (req, res) => {
    const cocktailOnClick = await Cocktail.findById(req.params.id)
    const {name, category, ingredients, image, steps} = cocktailOnClick
    res.render("users/details-private",{name, category, ingredients, image, steps})
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