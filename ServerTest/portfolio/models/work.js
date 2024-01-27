// Integração ao mongoose
const mongoose = require('mongoose');

// Definição do esquema do documento para a coleção "Work"
const workSchema = new mongoose.Schema({
  // Defina os campos e tipos de dados do documento "Work" aqui
 title:{
    type: String,
    required: true
 },
 subtitle:{
    type: String,
    required: true
 }
  // Adicione os campos conforme necessário
});


module.exports =  mongoose.model('WorkModel', workSchema);
