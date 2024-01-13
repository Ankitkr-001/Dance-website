const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 80;
const bodyparser = require("body-parser")
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

// Define mongoose schema

const contactSchema = new mongoose.Schema({
    name: String,
    Phone: Number,
    email: String,
    address: String,
    desn: String,

  });

  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))// For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine','pug') // set the template engine for pug
app.set('views', path.join(__dirname,'views')) // Set the views directory

// ENDPOINTS
app.get("/",(req,res)=>{
    const parms = {}
    res.status(200).render('home.pug',parms)

});
app.get("/contact",(req,res)=>{
    const parms = {}
    res.status(200).render('contact.pug',parms)

});

app.post("/contact",(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(404).send("This item has not been saved to database")
    })
    // res.status(200).render('contact.pug',parms)

});

// STRAT THE SERVER
app.listen(port,()=>{
    console.log(`The application started sucessfully on port ${port}`);
})
