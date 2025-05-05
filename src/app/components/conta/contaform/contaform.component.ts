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
  public objetoTipoConta: Tipoconta[] | any = [];
  public objetoStatusConta: StatusConta[] | any = [];

  service = inject(ContaService);
  tipoContaService = inject(TipocontaService);
  statusContaService = inject(StatusContaService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  location = inject(Location);
  nm_titulo = 'Cadastrar Conta';

  ngOnInit() {
    this.onShow();
  }

  onShow() {
    const key = this.route.snapshot.paramMap.get('id');

    this.obterTipoConta();
    this.obterStatus();

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
        Swal.fire({
          icon: 'error',
          title: err.error.code,
          text: err.error.error,
          confirmButtonText: 'OK',
        });
      },
    });
  }

  obterTipoConta() {
    this.tipoContaService.obterTodos().subscribe({
      next: (res: any) => {
        this.objetoTipoConta = res;
      },
    });
  }

  obterStatus() {
    this.statusContaService.obterTodos().subscribe({
      next: (res: any) => {
        this.objetoStatusConta = res;
      },
    });
  }
}
