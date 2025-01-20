const express = require('express')
const router = express.Router()

const User = require('../models/user.js')




router.get('/', async (req, res) => {
    try {
      res.render('views/employee/emp-track.ejs');
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  })




  // controllers/applications.js

router.get('/users/:userId/applications', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Render index.ejs, passing in all of the current user's
      // applications as data in the context object.
      res.render('views/employee/emp-track.ejs', {
        requests: currentUser.requests,
      });
    } catch (error) {

      console.log(error);
      res.redirect('/');
    }
  });
  

module.exports = router