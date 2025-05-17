import { Component, inject } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { BaseService } from '../../../services/base.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { InputTextComponent } from '../../component/input-text/input-text.component';
import { ButtonComponent } from '../../component/button/button.component';
import { HeaderComponent } from '../../component/header/header.component';
import { SelectComponent } from '../../component/select/select.component';


@Component({
  selector: 'app-categoriaform',
  imports: [
    InputTextComponent,
    RouterModule,
    ButtonComponent,
    HeaderComponent,
    SelectComponent,
  ],
  templateUrl: './categoriaform.component.html',
  styleUrl: './categoriaform.component.scss',
})
export class CategoriaformComponent {
  public objeto: Categoria = new Categoria();

  service = inject(CategoriaService);
  baseService = inject(BaseService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  location = inject(Location);
  nm_titulo = 'Cadastrar Categoria';
  endpoint = 'categoria';

  relacionadoObjeto = this.service.relacionadoObjeto;

  ngOnInit() {
    this.onShow();
  }

  onShow() {
    const key = this.route.snapshot.paramMap.get('id');

    this.baseService.obterObjetoRelacionado(
      'tipocategoria',
      this.relacionadoObjeto
    );

    if (!key) {
      this.obterSequencia();
    } else {
      this.onEdit(key);
    }
  }

  onClose() {
    this.location.back();
  }

  onEdit(id: any) {
    if (!id) return;
    this.baseService.obterPorId(this.endpoint, id).subscribe({
      next: (res: any) => {
        this.objeto = res;
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

  obterSequencia() {
    this.baseService.sequencia(this.endpoint).subscribe({
      next: (res: any) => {
        this.objeto.cd_categoria = res;
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

  onSave() {
    this.baseService.cadastrar(this.endpoint, this.objeto).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Tipo de conta cadastrado com sucesso!',
          confirmButtonText: 'OK',
        });
        this.onClose();
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar!',
          text: err.error.error,
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
