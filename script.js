// Importando e instansiando modulo express
const express = require("express")
const app = express()

const Post = require("./models/Post") /* Importando modulo de implementação no banco de dados através do sequelize */

// Importando e configurando o bodyparse(nativo do node)
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Configurando sequelize (acesso ao banco de dados)
const Sequelize = require("sequelize") /* Importando módulo */
const sequelize = new Sequelize(/* "teste" */"login", "daniel", "lab01", {
    host: "localhost", /* Servidor onde está o banco */
    dialect: "mysql", /* Tipo do banco */
    define: {
      timestamps: false
  }
}) /* Banco de dados(databases), usuario, senha */

  // Mensagens de autinticação e funcionamento
  sequelize.authenticate().then(function(){
      console.log("Conectado com sucesso!!!")
  }).catch(function(erro){
      console.log("Falha ao se conectar "+erro)
  })
  
  /* Tela de cadastro */
  
  app.post("/cad", function(req, res){
    res.render("formulario")
  })
  
/* Usuários Cadastrados */
  
app.get("/usuarios", function(req, res){
  Post.findAll({
    order: [
      ['data', 'ASC']
    ]
  }).then(function(marcarHorario){
    res.render("home", {marcarHorario: marcarHorario}) 
  })
})

/* Tela de login */

app.get("/", function(req, res){
    res.render("logar") 
})

/* Deletar usuários */

app.get("/deletar/:id", function(req, res){
  Post.destroy({
    where: {'id': req.params.id}
  }).then(function(){
    res.send(`<h1>Excluido com sucesso!!! <br> <a href="http://localhost:5501/usuarios">Ver tabela</a></h1>`)
  }).catch(function(erro){
    res.send("Esta postagem não existe!!!")
  })
})
 
/* Adicionando usuários ao banco de dados */

app.post("/marcacao", function(req, res){
  Post.create({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    maquina: req.body.maquina,
    data: req.body.data,
    hora: req.body.hora,
  }).then(function(){
    res.render("marcar")
  }).catch(function(erro){
    res.send("Houve um erro:::: "+ erro)
  })
})

app.post("/marcacao2", function(req, res){
  render("marcar")
})



/* Validar usuário */

app.post("/validar", function(req, res) {
  res.render("marcar")
})


// Módulo de intermediação entre o node o html
const handlebars = require("express-handlebars")
const { json, HostNotFoundError } = require("sequelize")
  // Config
    // Template Engine
      app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
      app.set("view engine", "handlebars") 

const porta = 5501

app.listen(porta, function(){
    console.log(`Servidor rodando na porta ${porta}`)
})
