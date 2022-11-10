require('dotenv').config()
const { Sequelize } = require('sequelize')

const { DB_HOST, DB_USER, DB_SCHEMA, DB_PASSWORD } = process.env


//Fazendo a conexão com o MySQL
const sequelize = new Sequelize(DB_SCHEMA, DB_USER, DB_PASSWORD, {
    dialect: 'mysql',
    host: DB_HOST
})

//Testando a conexão com o MySQL
sequelize.authenticate()
.then(() => {
    console.log("Conexão OK")
}).catch((erro) => {
    console.log("Conexão nada OK - " + erro)
})


module.exports = sequelize   