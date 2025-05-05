import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TipocontaService } from '../../../services/tipoconta.service';
import { Tipocategoria } from '../../../models/tipocategoria';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { InputTextComponent } from '../../component/input-text/input-text.component';
import { ButtonComponent } from '../../component/button/button.component';
import { TipocategoriaService } from '../../../services/tipocategoria.service';
import { HeaderComponent } from "../../component/header/header.component";

@Component({
  selector: 'app-tipocategoriaform',
  imports: [InputTextComponent, ButtonComponent, HeaderComponent],
  templateUrl: './tipocategoriaform.component.html',
  styleUrl: './tipocategoriaform.component.scss',
})
export class TipocategoriaformComponent implements OnInit {
  public objeto: Tipocategoria[] | any = [];

  service = inject(TipocategoriaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  location = inject(Location);
  nm_titulo = 'Tipo de Categoria';
  primaryKey = 'id_tipocategoria';

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('id');
    this.onEdit(key);
    if (!key) this.obterSequencia();
  }

  onClose() {
    this.location.back();
  }



  onEdit(id: any)
  {
    if(!id) return;
    this.service.obterPorId(id).subscribe({
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
    this.service.sequencia().subscribe({
      next: (res: any) => {
        this.objeto.cd_tipocategoria = res;
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
    if (!this.objeto[this.primaryKey]) {
      this.salvar();
    } else {
      this.atualizar();
    }
  }

  salvar() {
    this.service.cadastrar(this.objeto).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Registro cadastrado com sucesso!',
          confirmButtonText: 'OK',
        });
        this.onClose();
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

  atualizar() {
    this.service.atualizar(this.objeto).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Registro cadastrado com sucesso!',
          confirmButtonText: 'OK',
        });
        this.onClose();
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
