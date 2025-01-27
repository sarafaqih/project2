const express = require("express")
const router = express.Router()

const User = require('../models/user')

// ALl routes for application

// controllers/applications.js

router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id)
      // console.log(currentUser.requests)

      if (currentUser.role === 'employee'){
      res.render('applications/index.ejs',{requests:currentUser.requests})
      }
      else if(currentUser.role === 'manager'){
      res.render('Manager/homepage.ejs',{requests:currentUser.requests})
      }
      else{
        res.render('purchaseStaff/index.ejs',{requests:currentUser.requests})
      }
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
    const allUser = await User.find()
    const categoryType = req.query.action
    // console.log(currentUser.requests)
    let userRequests = []
      allUser.forEach((user) => {
        userRequests.push(user)
      })
// console.log("lll: "+userRequests)

    if (currentUser.role === 'employee'){
    res.render('applications/show.ejs',{requests:currentUser.requests})
    }
    else if(currentUser.role === 'manager'){
      //console.log("all users", allUser)
      // let userRequests = []
      // allUser.forEach((user) => {
      //   if(user.role==='employee'){
      //   //userRequests.username = user.username
      //   userRequests.push(user)
      //   //userRequests.push(user.requests) 
      //   }
      // });
      res.render('Manager/index.ejs',{
        allRequests:userRequests, 
        user:currentUser,
        categoryType: categoryType
      })
    //console.log("user requests", userRequests)
    }
    else if (currentUser.role === 'purchaseStaff'){
    // res.render('purchaseStaff/show.ejs',{requests:userRequests})
    res.render('purchaseStaff/show.ejs',{
      allRequests:userRequests, 
      user:currentUser,
      categoryType: categoryType
    })
    }     

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
  } catch(error){
    console.log(error)
    res.redirect('/')
  }
  })
    
router.get('/:requestId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    if(currentUser.role==='employee'){
    const request =  await currentUser.requests.id(req.params.requestId)
    res.render('applications/display.ejs', {request: request, currentUser:currentUser})
  } 
  else if (currentUser.role === 'manager'){
//to let the manager view each request in a seperate page
    const allUser = await User.find()
    let request = []
    let user = []
    allUser.forEach((oneUser) => {
      oneUser.requests.forEach((oneRequest)=>{
        if(oneRequest._id == req.params.requestId){
         user.push(oneUser)
         request.push(oneRequest)
        }
      })
    })
    res.render('Manager/show.ejs',
      {request:request, oneUser:user, currentUser: currentUser._id})

  }
  else if (currentUser.role === 'purchaseStaff'){
    //to let the purchaseStaff view each request in a seperate page
    const allUser = await User.find()
    let request = []
    let user = []
    allUser.forEach((oneUser) => {
      oneUser.requests.forEach((oneRequest)=>{
        if(oneRequest._id == req.params.requestId){
         user.push(oneUser)
         request.push(oneRequest)
        }
      })
    })
    res.render('purchaseStaff/display.ejs',
      {request:request, oneUser:user, currentUser: currentUser._id})
  }
} catch (error) {
    console.log(error)
    res.redirect('/')
  }
})


router.put("/:requestId",async(req,res)=>{
  try{
    const currentUser = await User.findById(req.session.user._id)
    const allUser = await User.find()
    let userRequests = []
    allUser.forEach((user) => {
      userRequests.push(user)
    })
    let itemRequests = []
    userRequests.forEach((request)=>{
      (request.requests).forEach((item) => {
        itemRequests.push(item)
      })})
      console.log("bbb"+itemRequests)

    if(currentUser.role === 'employee'){
      const request = currentUser.requests.id(req.params.requestId)    
      request.set(req.body)
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/applications/showAll`)
    }

    else if(currentUser.role === 'manager'){
      // to approve the request by the manager
    const user = await User.findOne({ "requests._id": req.params.requestId });
    const request = user.requests.id(req.params.requestId);
    if(req.body.action === 'approve'){
      request.status = 'Approve by Manager';
    }
    else if (req.body.action === 'reject'){
      request.status = 'Reject by Manager';
    }
    await user.save();
    res.redirect(`/users/${user._id}/applications/showAll?action=all`);
  }
  else if(currentUser.role === 'purchaseStaff'){
    const user = await User.findOne({ "requests._id": req.params.requestId });
    const request = user.requests.id(req.params.requestId);
    if(req.body.action === 'approve'){
      request.status = 'Approve by Purchase';
    }
    else if (req.body.action === 'reject'){
      request.status = 'Reject by purchase';
    }
    await user.save();
    res.redirect(`/users/${user._id}/applications/showAll?action=all`);
  }
  
    }catch(error){
      console.log(error)
      res.redirect('/')
    }
  })




// router.get('/:requestId/purchase/view', async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.session.user._id)
//     const request = currentUser.requests.id(req.params.requestId)
//     res.render('applications/purchase-view.ejs', {request: request, currentUser:currentUser})
//   } catch (error) {
//     console.log(error)
//     res.redirect('/')
//   }
// })


// router.put("/:requestId/purchase/view",async(req,res)=>{
//   const currentUser = await User.findById(req.session.user._id)
//   const request = await currentUser.requests.id(req.params.requestId)
//   request.set(req.body)
//   await currentUser.save()
//   res.redirect(`/users/${currentUser._id}/applications/showAll`)
// })




module.exports = router