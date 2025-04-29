import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { TipocategoriaService } from '../../../services/tipocategoria.service';
import { Router, RouterModule } from '@angular/router';
import { Tipoconta } from '../../../models/tipoconta';
import { CommonModule, Location } from '@angular/common';
import { Tipocategoria } from '../../../models/tipocategoria';

@Component({
  selector: 'app-tipocategorialist',
  imports: [CommonModule, RouterModule],

  templateUrl: './tipocategorialist.component.html',
  styleUrl: './tipocategorialist.component.scss',
})
export class TipocategorialistComponent {
  public objetos: Tipocategoria[] | any = [];

  service = inject(TipocategoriaService);
  router = inject(Router);
  nm_titulo = 'Tipo de Categoria';
  location = inject(Location);
  primaryKey = 'id_tipocategoria';

  ngOnInit() {
    this.onReload();
  }

  onClose() {
    this.router.navigate(['admin/dashboard']);
  }

  onReload() {
    this.service.obterTodos().subscribe((res) => {
      this.objetos = res;
    });
  }

  onEdit(item: any) {
    if (item)
      this.router.navigate(['admin/tipocategoriaform', item[this.primaryKey]]);
  }

  onDelete(item: any) {
    if (item) {
      this.service.deletar(item[this.primaryKey]).subscribe({
        next: (res: any) => {
          this.onReload();
        },
        error: (err) => {
          console.log(err);
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
}
