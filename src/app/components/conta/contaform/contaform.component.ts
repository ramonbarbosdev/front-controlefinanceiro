import { Component, inject } from '@angular/core';
import { InputTextComponent } from '../../component/input-text/input-text.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../component/button/button.component';
import { Conta } from '../../../models/conta';
import { ContaService } from '../../../services/conta.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contaform',
  imports: [InputTextComponent, RouterModule, ButtonComponent],
  templateUrl: './contaform.component.html',
  styleUrl: './contaform.component.scss',
})
export class ContaformComponent {
  public objeto: Conta[] | any = [];

  service = inject(ContaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  location = inject(Location);
  nm_titulo = 'Cadastrar Conta';

    ngOnInit() {
      const key = this.route.snapshot.paramMap.get('id');
      this.onEdit(key);
      if (!key) this.obterSequencia();
    }

    onClose() {
      this.location.back();
    }

    onEdit(id: any) {
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
}
