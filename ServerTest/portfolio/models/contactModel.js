const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{type: String,
    required: true},
    email:{type: String,
    required: true,
},
    options:{type: String},
    time:{type: String},
    description:{type: String,
    required:true}
    

})

module.exports = mongoose.model('Contact', contactSchema)