import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//'src/app/model/medico/medico';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  cpf=''
  senha=''

 constructor(private HttpClient: HttpClient) { }
  
 
 connectionLogin(){
    return this.HttpClient.post('http://localhost:7000/logar',
    {cpf: this.cpf, senha: this.senha})
    .pipe(
      (res) => {
        console.log ("retorno", res)
        return res
      },
      (err) =>{
        console.log ("erro", err)
        return err
      } 
    )
  }
  
  jose(){
    console.log("estou por aqui")
  }

  ngOnInit(): void {
  }

}
