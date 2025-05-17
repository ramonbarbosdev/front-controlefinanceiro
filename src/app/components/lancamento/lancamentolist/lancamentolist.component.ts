import { Component, inject } from '@angular/core';
import { Lancamento } from '../../../models/lancamento';
import { Router, RouterModule } from '@angular/router';
import { LancamentoService } from '../../../services/lancamento.service';
import Swal from 'sweetalert2';
import { ContaService } from '../../../services/conta.service';
import { BaseService } from '../../../services/base.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../component/header/header.component';
import { Conta } from '../../../models/conta';
import { Statuslancamento } from '../../../models/statuslancamento';

@Component({
  selector: 'app-lancamentolist',
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './lancamentolist.component.html',
  styleUrl: './lancamentolist.component.scss',
})
export class LancamentolistComponent {
  nm_titulo = 'Lancamento';

  public objetos: Lancamento[] | any = [];
  service = inject(LancamentoService);
  baseService = inject(BaseService);
  contaService = inject(ContaService);

  router = inject(Router);
  primaryKey = 'id_lancamento';
  endpoint = 'lancamento';

  relacionadoObjeto = this.service.relacionadoObjeto;

  ngOnInit() {
    this.onReload();
  }

  onReload() {
    this.baseService.obterObjetoRelacionado('conta', this.relacionadoObjeto);
    this.baseService.obterObjetoRelacionado(
      'statuslancamento',
      this.relacionadoObjeto
    );

    this.baseService.obterTodos(this.endpoint).subscribe((res) => {
      this.objetos = res;
    });
  }

  onEdit(item: any) {
    if (item)
      this.router.navigate([
        'admin/' + this.endpoint + 'form',
        item[this.primaryKey],
      ]);
  }

  onDelete(item: any) {
    if (item) {
      this.baseService.deletar(this.endpoint, item[this.primaryKey]).subscribe({
        next: (res: any) => {
          this.onReload();
        },
        error: (err) => {},
      });
    }
  }
}
