require('dotenv').config()
const mongoose = require('mongoose')

const DATABASE_URL = process.env.DB_URL

const DatabaseConnecting = async ()=>{
  try{
    const connect = await mongoose.connect(DATABASE_URL)
    if(connect){
      console.log('Databse connected')
    }else{
      console.log('Database not connected')
    }
  }catch(err){
    console.log(err)
  }
}

module.exports = DatabaseConnecting