import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TipocontaService } from '../../../services/tipoconta.service';
import { Tipoconta } from '../../../models/tipoconta';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { HeaderComponent } from "../../component/header/header.component";
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'app-tipocontalist',
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './tipocontalist.component.html',
  styleUrl: './tipocontalist.component.scss',
})
export class TipocontalistComponent implements OnInit {
  public objetos: Tipoconta[] | any = [];

  service = inject(TipocontaService);
  baseService = inject(BaseService);
  router = inject(Router);
  nm_titulo = 'Tipo de Conta';
  location = inject(Location);
  primaryKey = 'id_tipoconta';
  endpoint = 'tipoconta';

  ngOnInit() {
    this.onReload();
  }

  onClose() {
    this.router.navigate(['admin/dashboard']);
  }

  onNew()
  {
    this.router.navigate(['admin/tipocategoriaform']);
  }

  onReload() {
    this.baseService.obterTodos(this.endpoint).subscribe((res) => {
      this.objetos = res;
    });
  }

  onEdit(item: any) {
    if (item)
      this.router.navigate(['admin/tipocontaform', item[this.primaryKey]]);
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
