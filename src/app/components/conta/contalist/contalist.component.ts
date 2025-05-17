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
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'app-contalist',
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './contalist.component.html',
  styleUrl: './contalist.component.scss',
})
export class ContalistComponent implements OnInit {
  nm_titulo = 'Conta';
  endpoint = 'conta';

  public objetos: Conta[] | any = [];
  service = inject(ContaService);
  baseService = inject(BaseService);
  router = inject(Router);
  primaryKey = 'id_conta';

  relacionadoObjeto = this.service.relacionadoObjeto;

  ngOnInit() {
    this.onReload();
  }

  onReload() {

    this.baseService.obterObjetoRelacionado(
      'tipoconta',
      this.relacionadoObjeto
    );
    this.baseService.obterObjetoRelacionado(
      'statusconta',
      this.relacionadoObjeto
    );

    this.baseService.obterTodos(this.endpoint).subscribe((res) => {
      this.objetos = res;
    });
  }

  onEdit(item: any) {
    if (item)
      this.router.navigate([
        'admin/' + this.endpoint + 'form',
        item[this.primaryKey],
      ]);
  }

  onDelete(item: any) {
    if (item) {
      this.baseService.deletar(this.endpoint, item[this.primaryKey]).subscribe({
        next: (res: any) => {
          this.onReload();
        },
        error: (err) => {},
      });
    }
  }

  
}
