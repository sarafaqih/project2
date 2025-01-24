const mongoose = require('mongoose');

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

    requestCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
  
  
  })


  const Request = mongoose.model('Request', requestSchema)

  module.exports = Request;