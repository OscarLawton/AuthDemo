var express = require('express'),
    User = require('./models/user'),
    mongoose = require('mongoose'),
    passport = require("passport"),
    bodyParser = require('body-parser'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost:27017/auth_demo_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to DB!')).catch(error => console.log(error.message));


var app = express();

app.set('view engine', 'ejs');
app.use(require("express-session")({
    secret:"Lucky is a great cat",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/',(req, res) => {
    res.render('home');
});

app.get('/secret', (req, res) => {
    res.render("secret")
});

app.listen(3000, process.env.IP, ()=>{
    console.log("server started!!!");
})