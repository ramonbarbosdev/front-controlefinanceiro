import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { TipocontaService } from '../../../services/tipoconta.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextComponent } from '../../component/input-text/input-text.component';
import { ButtonComponent } from '../../component/button/button.component';
import { Tipoconta } from '../../../models/tipoconta';
import { Location } from '@angular/common';
import { HeaderComponent } from "../../component/header/header.component";

@Component({
  selector: 'app-tipocontaform',
  imports: [InputTextComponent, RouterModule, ButtonComponent, HeaderComponent],
  templateUrl: './tipocontaform.component.html',
  styleUrl: './tipocontaform.component.scss',
})
export class TipocontaformComponent {
  public objeto: Tipoconta = new Tipoconta();

  service = inject(TipocontaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  location = inject(Location);
  nm_titulo = 'Tipo de Conta';

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
