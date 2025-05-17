import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { TipocontaService } from '../../../services/tipoconta.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextComponent } from '../../component/input-text/input-text.component';
import { ButtonComponent } from '../../component/button/button.component';
import { Tipoconta } from '../../../models/tipoconta';
import { Location } from '@angular/common';
import { HeaderComponent } from "../../component/header/header.component";
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'app-tipocontaform',
  imports: [InputTextComponent, RouterModule, ButtonComponent, HeaderComponent],
  templateUrl: './tipocontaform.component.html',
  styleUrl: './tipocontaform.component.scss',
})
export class TipocontaformComponent {
  public objeto: Tipoconta = new Tipoconta();

  service = inject(TipocontaService);
  baseService = inject(BaseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  location = inject(Location);
  nm_titulo = 'Tipo de Conta';
  endpoint = 'tipoconta';

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

    this.baseService.obterPorId(this.endpoint,id).subscribe({
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
        this.objeto.cd_tipoconta = res;
      },
      error: (err) => {

      },
    });
  }

  onSave() {
    this.baseService.cadastrar(this.endpoint,this.objeto).subscribe({
      next: (res: any) => {
        this.onClose();
      },
      error: (err) => {
        
      },
    });
  }
}
