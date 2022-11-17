require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
//const { Sequelize } = require('sequelize')

const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("./models/usuario");

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  app.use(cors());
  next();
});

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

/*
const token = jwt.sign({secret: 7}, "segredo")


app.get("/teste", async (req, res) => {
    console.log(token)
    res.send(token)
})
*/

// ------CADASTRAR login de usuário------ FUNCIONANDO!!
app.post("/login", async (req, res) => {
  const dados = req.body;

  dados.senha = await bcrypt.hash(dados.senha, 7);

  await Usuario.create(dados).then(() => {
    return res.json({
      erro: false,
      senha: dados.senha,
      mensagem: "Usuário cadastrado!",
    });
  });
});

//// ------AUTENTICAÇÃO de usuário------ FUNCIONANDO!!
app.post("/logar", async (req, res) => {
  const usuario = await Usuario.findOne({
    attributes: ["nome", "senha", "tipo_acesso"],
    where: {
      cpf: req.body.cpf,
    },
  });

  if (usuario === null) {
    return res.status(400).json({
      erro: true,
      mensagem: "Usuário ou senha incorretos! (CPF não encontrado)",
    });
  }

  if (!((await req.body.senha) === usuario.senha)) {
    return res.status(400).json({
      erro: true,
      mensagem: "Usuário ou senha incorretos! (Senha incorreta)",
    });
  }

  //é uma "var" porque o valor pode ser alterado
  //deve ser informado a primary key, o valor está como 1 pois no momento não tem nenhum outro
  //já o "sorvete0101" é o segredo, teoricamente é algo "único".
  var token = jwt.sign({ cpf: 1 }, "sorvete0101");

  /*
>>>>>>> Stashed changes
    if(req.body.senha !== usuario.senha){
        return res.status(400).json({
            erro: true,
            mensagem: "Usuário ou senha incorretos! Senha inválida"
        })
    }
    */
  console.log("testei a senha");
  return res.json({
    erro: false,
    mensagem: "Login realizado!",
  });
});

app.put("/alterar-acesso", async (req, res) => {
  const usuario = await Usuario.findOne({
    attributes: ["tipo_acesso"],
    where: {
      cpf: req.body.cpf,
    },
  });
  const crm = req.body.crm;
  const acesso = req.body.tipo_acesso;
  const cpf_medico = req.body.cpf_medico;

  console.log(crm);
  if (usuario == null) {
    return res.status(400).json({
      erro: true,
      mensagem: "Usuário não encontrado! Tente novamente",
    });
  }

  if (
    acesso == "administrador" ||
    acesso == "Administrador" ||
    acesso == "adm"
  ) {
    if (cpf_medico != null) {
      const usuario_medico = await Usuario.findOne({
        attributes: ["tipo_acesso", "cpf", "nome", "crm"],
        where: {
          cpf: cpf_medico,
        },
      });
      console.log(crm);

      usuario_medico.update(
        { tipo_acesso: "Médico", crm },
        { where: { cpf: cpf_medico } }
      );
    } else {
      return res.status(400).json({
        erro: true,
        mensagem: "Mudança não permitida!",
      });
    }
  }

  res.status(201).json({
    erro: false,
    mensagem: "Mudança realizada!",
  });
});

// ------LISTAR login de todos os usuários------
app.get("/login-usuarios", (req, res) => {
  const sql = "SELECT * FROM tb_usuarios";

  pool.query(sql, (err, results, fields) => {
    console.log("Erro: ", err);
    console.log("Results: ", results);
    console.log("Fields: ", fields);
    res.send(results);
  });
});

// ------LISTAR login de usuário administrador------
app.get("/login-adm", (req, res) => {
  const sql = "SELECT * FROM tb_usuarios WHERE tipo_acesso='administrador'";

  pool.query(sql, (err, results, fields) => {
    console.log("Erro: ", err);
    console.log("Results: ", results);
    console.log("Fields: ", fields);
    res.send(results);
  });
});

// ------LISTAR login de usuários pacientes------
app.get("/login-pacientes", (req, res) => {
  const sql = "SELECT * FROM tb_usuarios WHERE tipo_acesso='paciente'";

  pool.query(sql, (err, results, fields) => {
    console.log("Erro: ", err);
    console.log("Results: ", results);
    console.log("Fields: ", fields);
    res.send(results);
  });
});

// ------LISTAR login de usuários médicos------
app.get("/login-medicos", (req, res) => {
  const sql = "SELECT * FROM tb_usuarios WHERE tipo_acesso='medico'";

  pool.query(sql, (err, results, fields) => {
    console.log("Erro: ", err);
    console.log("Results: ", results);
    console.log("Fields: ", fields);
    res.send(results);
  });
});

//PERGUNTA PARA O PROFESSOR
//Mudar essa requisição para outra pasta?
// ------ALTERAR tipo de acesso de um usuário (FUNÇÃO DO ADMINISTRADOR)------
app.put("/alterar-acesso", (req, res) => {
  const { cpf, tipo_acesso } = req.body;

  const sql =
    "UPDATE tb_usuarios SET tipo_acesso='" +
    tipo_acesso +
    "' WHERE cpf='" +
    cpf +
    "'";

  pool.query(sql, [cpf, tipo_acesso], (err, results, fields) => {
    console.log("Erro: ", err);
    console.log("Results: ", results);
    console.log("Fields: ", fields);
    res.send("Tipo de acesso ALTERADO!");
  });
});

const porta = 7000;
app.listen(porta, () =>
  console.log(`Autenticação - Conexão OK, porta: ${porta}`)
);
