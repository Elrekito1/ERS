// Integração ao mongoose
const mongoose = require('mongoose');

// Definição do esquema do documento para a coleção About
const aboutSchema = new mongoose.Schema({
 Especialidade: {
    type: String
 },
 SobreEspec:{
    type: String
 },
 TituloFazer:{
    type: String
 },
 DescFazer:{
    type: String
 }  
})

module.exports = mongoose.model('AboutModel', aboutSchema)