const db = require("./db")

const Post = db.sequelize.define("marcarHorario", {
    nome: {
        type: db.Sequelize.STRING
    },
    sobrenome: {
        type: db.Sequelize.TEXT
    },
    maquina: {
        type: db.Sequelize.TEXT
    },
    data: {
        type: db.Sequelize.TEXT
    },
    hora: {
        type: db.Sequelize.TEXT
    }
})

module.exports = Post /* acessar o post através de outros arquivos */

// Post.sync({force: true})
