
const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors())// Comando para usar antes das definições de rota 

// Liberação do CORS, assim permite req de outros domínios ou subdomínios
app.use(express.json())
app.use(express.urlencoded({extended: true})) // Para que o servidor compreenda o formato correta foi avisado o tipo de body que aceita (json)
// extended: true para que o parser se estenda a objetos encadeados

app.get("/", (req, res) =>{
    res.send('Home')
})

// Middlaware para configurar o host
app.use((req, res, next)=>{
  // Permitindo todos os hosts
  res.setHeader('Access-Control-Allow-Origin', '*');
  next()
})




app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
  });

// Middlewares é uma função que intercepta cada requisição que a aplicação recebe
// pelo método app.use() são declarados os middlewares do Express, toda requisição é respondida por um callback do tipo:
// (req, res, next) => {}
// A forma correta de tratar um erro é declarar um objeto Error e enviar para a função next(err) com um middleware após já ter declarado todas as rotas da aplicação


module.exports = app;