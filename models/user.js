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

  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  },

  approvalStatus: {
    type: String,
    enum: ['pending manager approval', 'approved by manager', 'rejected by manager', 'approved by purchasing', 'rejected by purchasing'],
    required: true,
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