const express = require("express")
const router = express.Router()

const User = require('../models/user')

// ALl routes for application

// controllers/applications.js

router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id)
      // console.log(currentUser.requests)
      res.render('applications/index.ejs',{requests:currentUser.requests})
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  })
  


router.get("/new", async(req,res)=>{
    res.render("applications/new.ejs")
})



router.get('/showAll', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    // console.log(currentUser.requests)
    res.render('applications/show.ejs',{requests:currentUser.requests})
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})


router.post("/", async(req, res)=>{
  try {
      const currentUser = await User.findById(req.session.user._id)
      currentUser.requests.push(req.body)
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/applications/showAll`)
  } catch (error) {
      console.log(error)
      res.redirect("/")
  }

})



// router.get('/:requestId',async(req,res)=>{
//   try{
//     const currentUser = await User.findById(req.session.user._id)
//     console.log(currentUser)
//     const request = currentUser.requests.id(req.params.requestId)
//     console.log(request)
//     res.render("applications/show.ejs",{request:request})
//   }catch(error){
//     console.log(error)
//     res.redirect("/")
//   }
// })

router.delete("/:requestId",async (req,res)=>{
  try{
    const currentUser = await User.findById(req.session.user._id)
    currentUser.requests.id(req.params.requestId).deleteOne()
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/applications/showAll`)
  }catch(error){
    console.log(error)
    res.redirect("/")
  }
})

router.get('/:requestId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const request = currentUser.requests.id(req.params.requestId)
    res.render('applications/edit.ejs', {request: request, currentUser:currentUser})
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put("/:requestId",async(req,res)=>{
  const currentUser = await User.findById(req.session.user._id)
  const request = await currentUser.requests.id(req.params.requestId)
  request.set(req.body)
  await currentUser.save()
  res.redirect(`/users/${currentUser._id}/applications/showAll`)
})

// router.get('/:requestId', async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.session.user._id)
//     const request = await currentUser.requests.id(req.params.requestId)
//     res.render('applications/display.ejs', {request: request, currentUser:currentUser})
//   } catch (error) {
//     console.log(error)
//     res.redirect('/')
//   }
// })


module.exports = router