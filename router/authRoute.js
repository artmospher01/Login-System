import express from "express"
import registerController from "../controller/registerController.js"
import loginController from "../controller/loginController.js"
import requiredLogin from "../middleware/requiredLogin.js"


const route = express.Router()

//! ==== register
route.post("/register", registerController)

//! ==== login
route.post("/login", loginController)

//! ==== authetication login
route.get("/user-auth", requiredLogin, (req, res) => {
  res.status(200).json({
    ok: true,
    success: true,
    mesaage: "login is successfull"
  })
})

//!================================
// !========= Google login


import passport from 'passport';
import cookieParser from "cookie-parser"
import configurePassport from "../middleware/passport.js"
import session from "express-session"



configurePassport(passport);

// Inisialisation Passport
route.use(
  session({
    secret: 'key00', // Replace with a more complex secret key for production
    resave: false,
    saveUninitialized: false,
  })
);

route.use(passport.initialize());
route.use(passport.session());
route.use(cookieParser())



route.get('/google', passport.authenticate('google', { scope: ['profile', "email"] }));

route.get(
  '/google/callback',
  passport.authenticate('google', {

    successRedirect: "/auth/user1"
  })
);

route.get("/login/success", (req, res) => {
  const userfull = req.cookies.userFull
  res.json({ userfull });
})

route.get("/user1", (req, res) => {

  res.cookie('userFull', req.user, {
    httpOnly: true,
    secure: true, // if use HTTPS
    sameSite: 'strict',
  });
  res.redirect("http://localhost:5173/")


})

route.get('/logout', (req, res) => {
  res.clearCookie('userFull');
  res.status(200).json({
    success: true,
    message: "logout is successfulllo"
  })
});


export default route