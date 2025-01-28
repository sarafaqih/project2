const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required:true
  },
  quantity: {
    type: Number,
    min:1,
    required:true
  },
  deliverydate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low']
  },
  status: {
    type:String,
    enum: ['Pending Manager', 'Approve by Manager', 'Reject by Manager', 'Approve by Purchase', 'Reject by purchase']
  },
   createdDate: {
    type: Date,
    required: true,
    default: Date.now
  },
})

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    enum: ['Purchase', 'IT', 'Finance', 'HR'],
    required: true
  },
  role: {
    type: String,
    enum: ['employee', 'manager', 'purchaseStaff'],
    required: true
  },
  requests: [requestSchema]
})

const User = mongoose.model('User', userSchema)

module.exports = User