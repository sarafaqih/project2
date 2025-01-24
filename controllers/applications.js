const express = require("express")
const router = express.Router()

const User = require('../models/user')
const Request = require('../models/requests')

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
    const requests = await Request.find().populate("requestCreator")
    // console.log(currentUser.requests)
    res.render('applications/show.ejs',{requests: requests})
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})


router.post("/", async(req, res)=>{
  try {
    req.body.requestCreator = req.session.user._id
      const currentUser = await User.findById(req.session.user._id)
      // currentUser.requests.push(req.body)
      // await currentUser.save()
      const createdRequest = await Request.create(req.body);
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
    // currentUser.requests.id(req.params.requestId).deleteOne()
    // await currentUser.save()
    const requests = await Request.findById(req.params.requestId)
    await requests.deleteOne();
    res.redirect(`/users/${currentUser._id}/applications/showAll`)
  }catch(error){
    console.log(error)
    res.redirect("/")
  }
})

router.get('/:requestId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    // const request = await currentUser.requests.id(req.params.requestId)
    const request = await Request.findById(req.params.requestId)
    res.render('applications/display.ejs', {request: request, currentUser:currentUser})
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:requestId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    // const request = currentUser.requests.id(req.params.requestId)
    const request = await Request.findById(req.params.requestId)
    res.render('applications/edit.ejs', {request: request, currentUser:currentUser})
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put("/:requestId",async(req,res)=>{
  const currentUser = await User.findById(req.session.user._id)
  // const request = await currentUser.requests.id(req.params.requestId)
  const request = await Request.findById(req.params.requestId)
  request.set(req.body)
  await currentUser.save()
  await request.save()
  res.redirect(`/users/${currentUser._id}/applications/showAll`)
})


router.get('/:requestId/purchase/view', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    // const request = currentUser.requests.id(req.params.requestId)
    const request = await Request.findById(req.params.requestId)
    res.render('applications/purchase-view.ejs', {request: request, currentUser:currentUser})
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put("/:requestId/purchase/view",async(req,res)=>{
  const currentUser = await User.findById(req.session.user._id)
  // const request = await currentUser.requests.id(req.params.requestId)
  const request = await Request.findById(req.params.requestId)
  request.set(req.body)
  await currentUser.save()
  await request.save()
  res.redirect(`/users/${currentUser._id}/applications/showAll`)
})




module.exports = router