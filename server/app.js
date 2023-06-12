//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
// const bcrypt = require("bcrypt") // passport replace this
// const saltRounds = 10;
mongoose.set('strictQuery', false);

const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(session({
  secret: 'Our little secret.',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_CONNECTION,{useNewUrlParser:true});

const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  secret: String
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User",userSchema );
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(function(user,done){
  done(null,user.id);
});
passport.deserializeUser(function(id,done){
  User.findById(id, function(err,user){
    done(err,user);
  });
});

app.route("/secrets")
.get(function(req,res){
  // first check if a user is already authenticated 

  User.find({"secret": {$ne: null}}, function(err, foundUsers){
    if (err){
      console.log(err);
    } else {

      if (foundUsers) {
        console.log(foundUsers);
        res.json({foundUsers});
      }
    }
  });

})

app.get("/submit", function(req,res){
  if (req.isAuthenticated()){
    res.render("submit");
  }else{
    res.redirect("/login");
  }
})

app.post("/submit", function(req,res){
  const submittedSecret = req.body.secret;

  console.log(req.user);
  User.findById(req.user.id,function(err,foundUser){
    if (err){
      console.log(err);
    }else{
      foundUser.secret = submittedSecret;
      foundUser.save(function(){
        res.redirect("/secrets");
      })
    }
  })
})

app.route("/register")
.post(function(req,res){
  User.register({username:req.body.username, active: false}, req.body.password, function(err, user) {

    if (err) {
      console.log(err);
      res.redirect("/register");

    }else{
      passport.authenticate("local")(req,res, function(){

          res.redirect("/secrets");
      })
    }

  });
})

app.route("/login")
.post( function(req,res){
  const user = new User({
    username:req.body.username,
    password:req.body.password

  });

  req.login(user, function(err){
    if (err){
      console.log(err);
      res.redirect("/login");

    }else{
      passport.authenticate("local")(req,res, function(){
          res.redirect("/secrets");
      })
    }
  })
})

app.route("/logout")
.get(function(req, res){
  req.logout();
  res.redirect("/login");
});

app.listen(3001,function(){
  console.log("Server started on port 3001")
});
