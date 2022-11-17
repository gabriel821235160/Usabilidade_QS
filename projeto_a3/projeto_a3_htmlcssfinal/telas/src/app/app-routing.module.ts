import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { LoginComponent } from './views/login/login.component';
import { InicialComponent } from './views/inicial/inicial.component';
import { ProntuarioComponent } from './views/prontuario/prontuario.component';
import { ListagemComponent } from './views/listagem/listagem.component';

const routes: Routes = [

//  {path: '', component: InicialComponent},
  {path: '', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'listagem', component:ListagemComponent},
  {path: 'prontuario', component: ProntuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
