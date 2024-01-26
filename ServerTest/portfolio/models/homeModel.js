const mongoose = require('mongoose')

const homeSchema = new mongoose.Schema({
   title:{ 
    type: String
   },
   subttile:{
    type: String
   },
   description:{
    type: String
   }
})

module.exports = mongoose.model('HomeModel', homeSchema)