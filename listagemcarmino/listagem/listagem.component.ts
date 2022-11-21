
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Banca } from 'src/app/models/banca/banca';
import { BancasService } from 'src/app/services/bancas/bancas.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'],
})
export class ListagemComponent implements OnInit {
  tituloBanca!: string;
  bancas$: Observable<Banca[]>; //Banca[] = [];
  displayedColumns = ['Data', 'Hora','Tipo', 'Titulo',  'Acoes'];

  constructor(
    private bancasService: BancasService,
    private dialog: MatDialog,
    private rota: Router,
    private rotaAtiva: ActivatedRoute,
    private location: Location
  ) {
    this.tituloBanca =
    this.rota.url.toString() == '/lbanca/1'
      ? 'Bancas previstas'
      : 'Bancas realizadas';
    const tipobnc = this.rota.url.toString() === '/lbanca/1' ? '1' : '2';
    this.bancas$ = this.bancasService.listaBancas(tipobnc).pipe(
      catchError((error) => {
        this.OnError('Erro ao carregar dados');
        return of([]);
      })
    );
  }

  OnError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {
    console.log("entrou no init ");
  }

  onAdd() {

  }
  onEdit(nbanca: Banca) {
    this.rota.navigate(['banca/',nbanca.bancaid]);
  }

  onDelete(nbanca: Banca) {}
  onCancelar() {}
}
