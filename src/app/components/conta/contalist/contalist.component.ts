import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Tipoconta } from '../../../models/tipoconta';
import { Conta } from '../../../models/conta';
import { ContaService } from '../../../services/conta.service';
import { TipocontaService } from '../../../services/tipoconta.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HeaderComponent } from "../../component/header/header.component";

@Component({
  selector: 'app-contalist',
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './contalist.component.html',
  styleUrl: './contalist.component.scss',
})
export class ContalistComponent implements OnInit {
  nm_titulo = 'Conta';

  public objetos: Conta[] | any = [];
  service = inject(ContaService);
  router = inject(Router);
  primaryKey = 'id_conta';

  ngOnInit() {
    this.onReload();
  }

  onReload() {
    this.obterTodos();
  }

  onEdit(item: any) {
    if (item) this.router.navigate(['admin/contaform', item[this.primaryKey]]);
  }

  onDelete(item: any) {
    if (item) {
      this.service.deletar(item[this.primaryKey]).subscribe({
        next: (res: any) => {
          this.onReload();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: err.error.code,
            text: err.error.error,
            confirmButtonText: 'OK',
          });
        },
      });
    }
  }

  obterTodos() {
    this.service.obterTodos().subscribe((res) => {
      this.service.buscarDadosAdicionais(res).subscribe({
        next: (dadosCompletos) => {
          this.objetos = dadosCompletos;
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: err.error?.code || 'Erro',
            text: err.error?.error || 'Erro ao buscar dados adicionais',
            confirmButtonText: 'OK',
          });
        },
      });
    });
  }
}
