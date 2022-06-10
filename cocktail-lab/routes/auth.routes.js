const router = require("express").Router();
const mongoose  = require('mongoose');

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const User= require("../models/User.model.js");


// require auth middleware
const { goToProfil } = require('../middleware/route.guard.js');

/* GET signup page */
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
      }

      const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (!regex.test(password)) {
        res
          .status(500)
          .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
        return;
      }

      const salt = await bcryptjs.genSaltSync(saltRounds);
      const passwordHashed = await bcryptjs.hashSync(password, salt);
      
      const newUser = await User.create({
        username,
        email,
        passwordHash: passwordHashed,
      });
      console.log("new user", newUser);
      res.redirect("/auth/login");
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if(error.code === 11000){
        res.status(500).render("auth/signup", { errorMessage: "This email already exists, please use another one or login with this email." });
      }else {
        console.log(error);
      }
    }
  });

/////// L O G I N ///////
/* GET login page */
router.get("/login", goToProfil, (req, res) => {
  res.render("auth/login");
});
// POST login route ==> to process form data
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body)
  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }
  User.findOne({ email }) // <== checks if there's user with this email
    .then(user => {
      if (!user) {
          // <== if there's no user with provided email
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        console.log("user is :",user)
        return;
      }
    // compare this password
    // with the hashed password in database
       else if (bcryptjs.compareSync(password, user.passwordHash)) {
         
      // if the two passwords match, render profile.ejs and
                //*** SAVE THE USER IN THE SESSION ****
      console.log('SESSION =====> ', req.session);
      req.session.currentUser = user;
      res.redirect('/user/profile');
      } else {
      // if  passwords DON'T match
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
}); 

//Logout:
router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});


module.exports = router;

