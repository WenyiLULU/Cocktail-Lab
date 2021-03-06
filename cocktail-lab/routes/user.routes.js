const router = require("express").Router();
const mongoose  = require('mongoose');

const Cocktail = require("../models/Cocktail.model.js");

const { isLoggedIn, isLoggedOut } = require('../middleware/route.guard.js');

const fileUploader = require("../config/cloudinary.config")

/* GET profile page */
router.get("/profile", isLoggedIn, async (req, res, next) => {
    //console.log(req.session.currentUser)
    const userInSession = req.session.currentUser
    const cocktailList = await Cocktail.find({author: userInSession._id})
    const likedList = await Cocktail.find({like: userInSession._id })
    //console.log ("cocktails", likedList)
    res.render("users/profile", {userInSession, cocktailList, likedList}); 
});

router.get("/create-cocktail", isLoggedIn, 
    (req, res, next) =>{
    res.render("users/createCocktail");     
})
router.post("/create-cocktail", isLoggedIn, fileUploader.single("receta-img"),
    async(req, res, next) =>{    
    const {name, category, ingredient, amount, steps} = req.body
    const userInSession = req.session.currentUser
    //console.log('req.body :', req.body)
    //console.log('req.file.path :',req.file)
    let ingredients = [];
    for(let i=0; i<ingredient.length; i+=1){
        ingredients.push({ingredient:ingredient[i], amount:amount[i]})
    }
    //console.log("new cocktail input ==>>>", {name, category, ingredient, amount, steps}) 
    if(req.file){
        const newCocktail = await Cocktail.create({
            name,
            category,
            ingredients: ingredients,
            author: userInSession._id,
            steps,
            image: req.file.path
        })
    }else{
        const newCocktail = await Cocktail.create({
            name,
            category,
            ingredients: ingredients,
            author: userInSession._id,
            steps
        })
        console.log('New cocktail:',newCocktail)
    }
    
    res.redirect("/user/profile");   
})

router.get("/details-private/:id", isLoggedIn, async (req, res) => {
    const cocktailOnClick = await Cocktail.findById(req.params.id)
    const {id, name, category, ingredients, image, steps} = cocktailOnClick
    const authorInfo = await cocktailOnClick.populate('author')
    const authorName = authorInfo.author.username
    const likeArr = cocktailOnClick.like
    let number = likeArr.length
    res.render("users/details-private",{id, name, category, ingredients, image, steps,authorName, number})
  })

//  Edit cocktail
  router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const cocktail = await Cocktail.findById(req.params.id)
    res.render('users/edit-cocktail', { cocktail })
  })
  
  router.post('/edit/:id', isLoggedIn, fileUploader.single("receta-img"), 
  async (req, res) => {
    console.log(req.body)
    const userInSession = req.session.currentUser
    const {name, category, ingredient, amount, steps} = req.body
    const imageOld = await Cocktail.findById(req.params.id)
    const imageOldUrl = imageOld.image
    let ingredients = [];
    for(let i=0; i<ingredient.length; i+=1){
        ingredients.push({ingredient:ingredient[i], amount:amount[i]})
    }
    //console.log("new cocktail input ==>>>", {name, category, ingredient, amount, steps}) 
    if(req.file){
        const newCocktail = {
            name,
            category,
            author: userInSession._id,
            ingredients: ingredients,
            steps,
            image: req.file.path
        }
        await Cocktail.findByIdAndUpdate(req.params.id, newCocktail)
    }
    else{const newCocktail = {
            name,
            category,
            author: userInSession._id,
            ingredients: ingredients,
            steps,
            image: imageOldUrl
        }
        await Cocktail.findByIdAndUpdate(req.params.id, newCocktail)
    }
    
    res.redirect(`/user/details-private/${req.params.id}`)
  })
  


  //  Delete cocktail
  router.post('/delete/:id', async (req, res) => {
    try {
    await Cocktail.findByIdAndDelete(req.params.id)
    res.redirect('/user/profile')
    
  } catch (error) {
    console.log('Error deleting: ' , error)
  }
  });

  //Like cocktail
  router.post('/like/:id', isLoggedIn, async (req, res) => {
    const userInSession = req.session.currentUser
    const id = req.params.id
    const userObjectId = mongoose.Types.ObjectId(userInSession._id)
    const cocktailOnClick = await  Cocktail.findById(id)
    const likeArr = cocktailOnClick.like
    const cocktailId = mongoose.Types.ObjectId(id)
    console.log('find like arr', likeArr)
    
        try {
        await Cocktail.updateOne({_id: cocktailId}, {$addToSet: {like: [userObjectId]}})
        res.redirect(`/user/details-private/${id}`)
        
      } catch (error) {
        console.log('Error deleting: ' , error)
      }
    
    
  });


module.exports = router
