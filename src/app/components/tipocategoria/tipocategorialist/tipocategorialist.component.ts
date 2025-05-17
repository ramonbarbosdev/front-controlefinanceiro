import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { TipocategoriaService } from '../../../services/tipocategoria.service';
import { Router, RouterModule } from '@angular/router';
import { Tipoconta } from '../../../models/tipoconta';
import { CommonModule, Location } from '@angular/common';
import { Tipocategoria } from '../../../models/tipocategoria';
import { HeaderComponent } from "../../component/header/header.component";
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'app-tipocategorialist',
  imports: [CommonModule, RouterModule, HeaderComponent],

  templateUrl: './tipocategorialist.component.html',
  styleUrl: './tipocategorialist.component.scss',
})
export class TipocategorialistComponent {
  public objetos: Tipocategoria[] | any = [];

  service = inject(TipocategoriaService);
  baseService = inject(BaseService);
  router = inject(Router);
  nm_titulo = 'Tipo de Categoria';
  location = inject(Location);
  primaryKey = 'id_tipocategoria';
  endpoint = 'tipocategoria';

  ngOnInit() {
    this.onReload();
  }

  onClose() {
    this.router.navigate(['admin/dashboard']);
  }

  onNew() {
    this.router.navigate(['admin/tipocategoriaform']);
  }

  onReload() {
    this.baseService.obterTodos(this.endpoint).subscribe((res) => {
      this.objetos = res;
    });
  }

  onEdit(item: any) {
    if (item)
      this.router.navigate(['admin/tipocategoriaform', item[this.primaryKey]]);
  }

  onDelete(item: any) {
    if (item) {
      this.baseService.deletar(this.endpoint, item[this.primaryKey]).subscribe({
        next: (res: any) => {
          this.onReload();
        },
        error: (err) => {
         
        },
      });
    }
  }
}
