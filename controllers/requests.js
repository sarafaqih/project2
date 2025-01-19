const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get("/", async(req, res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id)
        console.log(currentUser.requestSchema)
        res.render("homepage.ejs", {requests: currentUser.requestSchema})    
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
    
})

router.get("/new", async(req, res)=>{
    try {
        res.render("/request/new.ejs")
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})


module.exports = router;