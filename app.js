//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.4mdyc.mongodb.net/secretsDB",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

const userSchema = {
    email: String,
    password: String
}

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    newUser.findOne({email: email}, (err, foundUser) => {
        if (err){
            console.log(err);
        } else {
            if(foundUser.password === password) {
                res.render("secrets");
            }
        }
    })
});



app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    const newUser = new User({
        email: email,
        password: password
    })
    newUser.save((err) => {
        if(err){
            console.log(err);
        } else {
            res.render("secrets");
        }
    })
});

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});