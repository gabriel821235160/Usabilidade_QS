Integrantes do Grupo:
Diego Jaldin - RA:821119998
Gabriel Lima Ruas - RA:821235160
Geovanna Holanda da Silva- RA:819115164
Luidy Yutá Pereira Monteiro - RA:82119379
Rafael Freitas Venosa - RA:82117385

Atualização 10/11:
- Foi feita a implementação do cadastro dos usuários.
- Foi feita a implementação da autenticação dos usuários.
- Foi feita a implementação da alteração de acesso (função do administrador).

Obs.: Foi utilizado o Sequelize e o banco de dados MySQL.

#Arquivo .env:
DB_HOST=localhost
DB_USER=root
DB_SCHEMA=(nome_bd)
DB_PASSWORD=(senha_bd)

#No MySQL, criar o banco de dados com o comando:
CREATE DATABASE IF NOT EXISTS sistema_clinica_medica;

#Requisições:
Post: criar login
http://localhost:7000/login
{
  "nome": "",
  "cpf": "",
  "dt_nascimento": "",
  "senha": "",
  "tipo_acesso": ""
}

Post: autenticação do login
http://localhost:7000/logar
{
  "cpf": "",
  "senha": ""
}

Put: alterar o acesso (função do administrador)
http://localhost:7000/alterar-acesso
{
  "cpf": "",
  "tipo_acesso": "",
  "cpf_medico": ""
}
