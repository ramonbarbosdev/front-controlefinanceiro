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
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'app-tipocategoriaform',
  imports: [InputTextComponent, ButtonComponent, HeaderComponent],
  templateUrl: './tipocategoriaform.component.html',
  styleUrl: './tipocategoriaform.component.scss',
})
export class TipocategoriaformComponent implements OnInit {
  public objeto: Tipocategoria = new Tipocategoria();

  service = inject(TipocategoriaService);
  baseService = inject(BaseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  location = inject(Location);
  nm_titulo = 'Tipo de Categoria';
  primaryKey = 'id_tipocategoria';
  endpoint = 'tipocategoria';

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('id');
    this.onEdit(key);
    if (!key) this.obterSequencia();
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

      },
    });
  }

  obterSequencia() {
    this.baseService.sequencia(this.endpoint).subscribe({
      next: (res: any) => {
        this.objeto.cd_tipocategoria = res;
      },
      error: (err) => {},
    });
  }

  onSave() {
    this.baseService.cadastrar(this.endpoint, this.objeto).subscribe({
      next: (res: any) => {
        this.onClose();
      },
      error: (err) => {
       
      },
    });
  }
}
