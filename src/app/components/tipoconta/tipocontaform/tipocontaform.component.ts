import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { TipocontaService } from '../../../services/tipoconta.service';
import { Router, RouterModule } from '@angular/router';
import { InputTextComponent } from '../../component/input-text/input-text.component';
import { ButtonComponent } from '../../component/button/button.component';

@Component({
  selector: 'app-tipocontaform',
  imports: [InputTextComponent, RouterModule, ButtonComponent],
  templateUrl: './tipocontaform.component.html',
  styleUrl: './tipocontaform.component.scss',
})
export class TipocontaformComponent {
  public objeto = {
    cd_tipoconta: '',
    nm_tipoconta: '',
  };

  service = inject(TipocontaService);
  private router = inject(Router);

  ngOnInit() {
    this.obterSequencia();
  }

  obterSequencia() {
    this.service.sequencia().subscribe({
      next: (res: any) => {
        this.objeto.cd_tipoconta = res;
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
        this.router.navigate(['admin/dashboard']);
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
