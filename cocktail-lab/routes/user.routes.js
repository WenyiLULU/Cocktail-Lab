const router = require("express").Router();

const Cocktail = require("../models/Cocktail.model.js");

const { isLoggedIn, isLoggedOut } = require('../middleware/route.guard.js');

const fileUploader = require("../config/cloudinary.config")

/* GET home page */
router.get("/profile", isLoggedIn, async (req, res, next) => {
    //console.log(req.session.currentUser)
    const userInSession = req.session.currentUser
    const cocktailList = await Cocktail.find({author: userInSession._id})
    //console.log ("cocktails", cocktailList)
    res.render("users/profile", {userInSession, cocktailList}); 
});

router.get("/create-cocktail", isLoggedIn, 
    (req, res, next) =>{
    res.render("users/createCocktail");     
})
router.post("/create-cocktail", isLoggedIn, fileUploader.single("receta-img"),
    async(req, res, next) =>{    
    const {name, category, ingredient, amount, steps} = req.body
    const userInSession = req.session.currentUser
    console.log('req.body :', req.body)
    console.log('req.file.path :',req.file)
    let ingredients = [];
    for(let i=0; i<ingredient.length; i+=1){
        ingredients.push({ingredient:ingredient[i], amount:amount[i]})
    }
    //console.log("new cocktail input ==>>>", {name, category, ingredient, amount, steps}) 
    const newCocktail = await Cocktail.create({
        name,
        category,
        ingredients: ingredients,
        author: userInSession._id,
        steps,
        image: req.file.path
    })
    console.log('New cocktail:',newCocktail)
    res.redirect("/");   
})

router.get("/details-private/:id", isLoggedIn, async (req, res) => {
    const cocktailOnClick = await Cocktail.findById(req.params.id)
    const {name, category, ingredients, image, steps} = cocktailOnClick
    res.render("users/details-private",{name, category, ingredients, image, steps})
  })


module.exports = router;

