import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../../../autenticacao/models/usuario';
//'src/app/model/medico/medico';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 /* constructor(private HttpClient: HttpClient) { }
  connectionLogin(){
    return this.HttpClient.get<Usuario>('http://localhost:7000/')
    .pipe(
      (res) => res,
      (err) => err
    )
  }*/

  ngOnInit(): void {
  }

}
