const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  employee_id: {
    type: Number,
    required: true,
  },
  contact: {
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    full_address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  department: {
    department_name: {
      type: String,
      required: true,
    },
  },
  image: {
    type: String,
    default: 'image.jpg'
  },
  versionkey: {
    type: Boolean,
    default: false
  },
});

const employeeModel = mongoose.model('employee', employeeSchema)

module.exports = employeeModel