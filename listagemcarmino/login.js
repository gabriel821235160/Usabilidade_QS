import express from "express";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import verificaJWT from "../validacao/validar-jwt.js";

const routes = express.Router();


routes.post("/logar", (req, res, error) => {
    const sql = "SELECT * FROM login WHERE useremail = ?";
    const useremail = req.body.useremail;
  
    pool.query(sql, [useremail], (err, results, fields) => {
      if (results.length > 0) {
        if (
          req.body.useremail === results[0].useremail &&
          bcrypt.compareSync(req.body.userpassword, results[0].userpassword)
        ) {
          const token = jwt.sign({ userId: results[0].useremail }, SECRET, {
            expiresIn: 300000,
          });
          return res.json({ auth: true, token });
        }
      }
      res.status(401).json({ message: "Usuário ou senha incorreta" }).end();
    });
  });
  
  routes.post("/login", (req, res, error) => {
    const sql =
      "INSERT INTO login (useremail, usernome, userpassword, usertipo ) VALUES (?, ?, ?, ?)";
  
    const useremail = req.body.useremail;
    const usernome = req.body.usernome;
    const userpassword = bcrypt.hashSync(req.body.userpass);
    const usertipo = "00";
  
    pool.query(
      sql,
      [useremail, usernome, userpassword, usertipo],
      (err, results, fields) => {
        if (err) {
          const errorMessage =
            err.code === "ER_DUP_ENTRY"
              ? "conta já existente !!!!"
              : "erro interno entre em contato com o fornecedor codigo " +
                err.code;
          res.send({ mensagem: errorMessage });
        } else {
          res.send({ mensagem: "transação conlcuida" });
        }
      }
    );
  });
  
  routes.get("/llogin", (req, res, error) => {
    const sql = `SELECT * FROM login`;
    pool.query(sql, (err, results, fields) => {
      if (results.length > 0) {
        return res.status(200).json(results);
      }
      res.status(401).end();
    });
  });
  
  routes.get("/ulogin", verificaJWT, (req, res, error) => {
    const sql = "SELECT * FROM login WHERE useremail = ?";
    const userId = req.userId;
  
    pool.query(sql, [userId], (err, results, fields) => {
      if (results.length > 0) {
        return res.status(200).json(results[0]);
      }
      res.status(401).end();
    });
  });
  
  routes.put("/login", (req, res, error) => {
    const sql =
      "UPDATE login SET  usernome =?, usertipo =? , userfiliacao =? WHERE useremail= ?";
    const usernome = req.body.usernome;
    const usertipo = req.body.usertipo;
    const userfiliacao = req.body.userfiliacao;
    const usermail = req.body.useremail;
  
    pool.query(
      sql,
      [usernome, usertipo, userfiliacao, usermail],
      (err, results, fields) => {
        if (err) {
          const errorMessage =
            err.code === "ER_DUP_ENTRY"
              ? "conta já existente !!!!"
              : "erro interno entre em contato com o fornecedor codigo " +
                err.code;
          res.send({ mensagem: errorMessage });
        } else {
          res.status(200).send({ mensagem: "transação conlcuida" });
        }
      }
    );
  });
  
  routes.get("/logout", (req, res, error) => {
    res.end();
  });
  
  routes.get("/userid", verificaJWT, (req, res, error) => {
    console.log(" junior ");
    req.body.userid = "req.body.userId";
    console.log("usuario " + req.body.userId + " nome " + req.body.nome);
    return res.json({ userid: req.body.userId });
  });


export default routes 
