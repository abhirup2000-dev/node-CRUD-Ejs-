const { required } = require('joi')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const joiSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})

const joiModel = mongoose.model('joiModel', joiSchema)

module.exports = joiModel