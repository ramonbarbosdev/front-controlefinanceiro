import { Component, inject } from '@angular/core';
import { InputTextComponent } from '../../component/input-text/input-text.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../component/button/button.component';
import { Conta } from '../../../models/conta';
import { ContaService } from '../../../services/conta.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { HeaderComponent } from "../../component/header/header.component";
import { SelectComponent } from "../../component/select/select.component";
import { TipocontaService } from '../../../services/tipoconta.service';
import { Tipoconta } from '../../../models/tipoconta';
import { StatusContaService } from '../../../services/status-conta.service';
import { StatusConta } from '../../../models/status-conta';
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

  relacionadoObjeto = this.service.relacionadoObjeto;


  ngOnInit() {
    this.onShow();
  }

  onShow() {
    const key = this.route.snapshot.paramMap.get('id');

    this.baseService.obterObjetoRelacionado('tipoconta', this.relacionadoObjeto);
    this.baseService.obterObjetoRelacionado('statusconta', this.relacionadoObjeto);

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
        this.objeto.cd_conta = res;
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
    this.service.cadastrar(this.objeto).subscribe({
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
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: "Erro ao salvar!",
          text: err.error.error,
          confirmButtonText: 'OK',
        });
      },
    });
  }


}
