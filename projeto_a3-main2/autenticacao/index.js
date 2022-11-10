require('dotenv').config()
const express = require('express')
const app = express()
//const { Sequelize } = require('sequelize')


const mysql = require('mysql2')
const Usuario = require('./models/usuario')

app.use(express.json())

/*
//Deixando as informações para a conexão com o Banco de Dados "escondida" (dentro do .env)
const { DB_HOST, DB_USER, DB_SCHEMA, DB_PASSWORD } = process.env

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_SCHEMA,
    password: DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 2
}) 

//Tentativa de usar o sequelize
const sequelize = new Sequelize(DB_SCHEMA, DB_USER, DB_PASSWORD, {
    dialect: 'mysql',
    host: DB_HOST
})

//Tentando conexão com o Bando de Dados
sequelize.authenticate()
.then(() => {
    console.log("Conexão OK")
}).catch((erro) => {
    console.log("Conexão nada OK - " + erro)
}) */


// ------CADASTRAR login de usuário------ FUNCIONANDO!!
app.post("/login", (req, res) => {

    //utilizando o operador de descontrução:
    const dados = req.body

    Usuario.create(dados)
    .then( () => {
        return res.json({
            erro: false,
            mensagem: "Usuário cadastrado!"
        })
    }).catch( () => {
        return res.status(400).json({
            erro: true,
            mensagem: "Usuário não cadastrado!"
        })
    })
})

//// ------AUTENTICAÇÃO de usuário------ FUNCIONANDO!!
app.post("/logar", async (req, res) => {
    
    const usuario = await Usuario.findOne({
        attributes: ['nome', 'senha', 'tipo_acesso'],
        where: {
            cpf: req.body.cpf
        }
    })  

    if (usuario === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Usuário ou senha incorretos!CPF não encontrado."
        })
    }

    if(req.body.senha !== usuario.senha){
        return res.status(400).json({
            erro: true,
            mensagem: "Usuário ou senha incorretos! Senha inválida"
        })
    }

    return res.json({
        erro: false,
        mensagem: "Login realizado!"
    })

})






// ------LISTAR login de todos os usuários------
app.get("/login-usuarios", (req, res) => {
    const sql = "SELECT * FROM tb_usuarios"

    pool.query(sql, (err, results, fields) => {
        console.log("Erro: ", err)
        console.log("Results: ", results)
        console.log("Fields: ", fields)
        res.send(results)
    })
})

// ------LISTAR login de usuário administrador------
app.get("/login-adm", (req, res) => {
    const sql = "SELECT * FROM tb_usuarios WHERE tipo_acesso='administrador'"

    pool.query(sql, (err, results, fields) => {
        console.log("Erro: ", err)
        console.log("Results: ", results)
        console.log("Fields: ", fields)
        res.send(results)

    })
})

// ------LISTAR login de usuários pacientes------
app.get("/login-pacientes", (req, res) => {
    const sql = "SELECT * FROM tb_usuarios WHERE tipo_acesso='paciente'"

    pool.query(sql, (err, results, fields) => {
        console.log("Erro: ", err)
        console.log("Results: ", results)
        console.log("Fields: ", fields)
        res.send(results)
    })
})

// ------LISTAR login de usuários médicos------
app.get("/login-medicos", (req, res) => {
    const sql = "SELECT * FROM tb_usuarios WHERE tipo_acesso='medico'"

    pool.query(sql, (err, results, fields) => {
        console.log("Erro: ", err)
        console.log("Results: ", results)
        console.log("Fields: ", fields)
        res.send(results)
    })
})




//PERGUNTA PARA O PROFESSOR
//Mudar essa requisição para outra pasta?
// ------ALTERAR tipo de acesso de um usuário (FUNÇÃO DO ADMINISTRADOR)------
app.put("/alterar-acesso", (req, res) => {
    const { cpf, tipo_acesso } = req.body

    const sql = "UPDATE tb_usuarios SET tipo_acesso='" + tipo_acesso + "' WHERE cpf='" + cpf + "'"

    pool.query(sql, [cpf, tipo_acesso], (err, results, fields) => {
        console.log("Erro: ", err)
        console.log("Results: ", results)
        console.log("Fields: ", fields)
        res.send("Tipo de acesso ALTERADO!")
    })

})









const porta = 7000
app.listen(porta, () => console.log(`Autenticação - Conexão OK, porta: ${porta}`))