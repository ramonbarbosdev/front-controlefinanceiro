import { Component, inject } from '@angular/core';
import { InputTextComponent } from '../../component/input-text/input-text.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../component/button/button.component';
import { Conta } from '../../../models/conta';
import { ContaService } from '../../../services/conta.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { HeaderComponent } from "../../component/header/header.component";
import { SelectComponent } from "../../component/select/select.component";
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'app-contaform',
  standalone: true,
  imports: [
    InputTextComponent,
    RouterModule,
    ButtonComponent,
    HeaderComponent,
    SelectComponent,
  ],
  templateUrl: './contaform.component.html',
  styleUrl: './contaform.component.scss',
})
export class ContaformComponent {
  public objeto: Conta = new Conta();

  service = inject(ContaService);
  baseService = inject(BaseService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  location = inject(Location);
  nm_titulo = 'Cadastrar Conta';
  endpoint = 'conta';

  relacionadoObjeto = this.service.relacionadoObjeto;

  ngOnInit() {
    this.onShow();
  }

  onShow() {
    const key = this.route.snapshot.paramMap.get('id');

    this.baseService.obterObjetoRelacionado(
      'tipoconta',
      this.relacionadoObjeto
    );
    this.baseService.obterObjetoRelacionado(
      'statusconta',
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
        this.objeto.cd_conta = res;
      },
      error: (err) => {

      },
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
