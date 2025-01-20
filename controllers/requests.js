const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
      res.render('request/homepage.ejs');
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

router.get("/new", async(req, res)=>{
    try {
        res.render("request/new.ejs")
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

router.post("/", async(req, res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.requestSchema.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/requests`);
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
 
})


module.exports = router;