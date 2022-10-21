import express from "express";
import cors from "cors";

import database from "./firebase-db.js";
import { ref, get, set } from "firebase/database";

// iniciando o express
const app = express();
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// Rota raiz direciona para a pasta front
app.use("/", express.static("./front"));

app.get("/login", function (req, res) {
  let loginRef = ref(database, "/login");
  get(loginRef).then((snap) => {
    let listaLogin = snap.val();
    return res.status(200).json(listaLogin);
  });
});

app.post("/login", function (req, res) {
  console.log("recebi requisição POST com body:", req.body);
  //pega os dados enviados na requisição
  let dados = req.body;
  let id = dados.id;
  // Pega uma referência para o caminho /bandas/<ID>
  let novaLoginRef = ref(database, "/login/" + id);
  // Adiciona dados no firebase no caminho /bandas/<ID>
  set(novaLoginRef, dados).then(() => {
    return res.status(200).json(dados);
  });
});

app.post("/cliente", function (req, res) {
  let dados = req.body;
  let id = dados.id;
  let novaRegRef = ref(database, "/cliente/" + id);
  set(novaRegRef, dados).then(() => {
    return res.status(200).json(dados);
  });
});

app.put("/Login/:id", function (req, res) {
  console.log("recebi requisição PUT com body: ", req.body);
  //pega os dados enviados na requisição
  let dados = req.body;
  let id = req.params.id;
  // Pega uma referência para o caminho /bandas/<ID>
  let novaLoginRef = ref(database, "/login/" + id);
  // Adiciona dados no firebase no caminho /bandas/<ID>
  set(novaLoginRef, dados).then(() => {
    console.log("Adicionado");
    return res.status(200).json(dados);
  });
});

app.delete("/login/:id", function (req, res) {
  //pega os dados enviados na requisição
  let dados = req.body;
  let id = req.params.id;
  // Pega uma referência para o caminho /bandas/<ID>
  let novaLoginRef = ref(database, "/login/" + id);
  // Remove /bandas/<ID>
  set(novaLoginRef, null).then(() => {
    console.log("Excluido");
    return res.status(200).json(dados);
  });
});

app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000 ...");
});
