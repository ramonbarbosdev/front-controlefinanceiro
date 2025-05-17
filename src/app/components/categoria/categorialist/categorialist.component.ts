import { Component, inject } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { BaseService } from '../../../services/base.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../component/header/header.component';

@Component({
  selector: 'app-categorialist',
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './categorialist.component.html',
  styleUrl: './categorialist.component.scss',
})
export class CategorialistComponent {
  nm_titulo = 'Categoria';

  public objetos: Categoria[] | any = [];
  service = inject(CategoriaService);
  baseService = inject(BaseService);
  router = inject(Router);
  primaryKey = 'id_categoria';
  endpoint = 'categoria';

  relacionadoObjeto = this.service.relacionadoObjeto;

  ngOnInit() {
    this.onReload();
  }

  onReload() {
    this.baseService.obterObjetoRelacionado(
      'tipocategoria',
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
