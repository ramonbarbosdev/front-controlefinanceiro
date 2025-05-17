import { Component, inject } from '@angular/core';
import { InputTextComponent } from '../../component/input-text/input-text.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../component/button/button.component';
import { HeaderComponent } from '../../component/header/header.component';
import { SelectComponent } from '../../component/select/select.component';
import Swal from 'sweetalert2';
import { LancamentoService } from '../../../services/lancamento.service';
import { ContaService } from '../../../services/conta.service';
import { Lancamento } from '../../../models/lancamento';
import { Conta } from '../../../models/conta';
import { CommonModule, Location } from '@angular/common';
import { InputTextareaComponent } from '../../component/input-textarea/input-textarea.component';
import { InputDateComponent } from "../../component/input-date/input-date.component";
import { Statuslancamento } from '../../../models/statuslancamento';
import { BaseService } from '../../../services/base.service';
import { InputNumberComponent } from "../../component/input-number/input-number.component";
import { Itemlancamento } from '../../../models/itemlancamento';
import { ItemlancamentodetalheComponent } from "./itemlancamentodetalhe/itemlancamentodetalhe.component";
import { Categoria } from '../../../models/categoria';
import { Metodopagamento } from '../../../models/metodopagamento';
import { Tipooperacao } from '../../../models/tipooperacao';
import { formatarDataParaInput } from '../../../utils/formatarDataParaInput';

@Component({
  selector: 'app-lancamentoform',
  imports: [
    InputTextComponent,
    RouterModule,
    ButtonComponent,
    HeaderComponent,
    SelectComponent,
    InputTextareaComponent,
    InputDateComponent,
    InputNumberComponent,
    CommonModule,
    ItemlancamentodetalheComponent,
  ],
  templateUrl: './lancamentoform.component.html',
  styleUrl: './lancamentoform.component.scss',
})
export class LancamentoformComponent {
  public objeto: Lancamento = new Lancamento();

  service = inject(LancamentoService);
  baseService = inject(BaseService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  location = inject(Location);
  nm_titulo = 'Cadastrar Lançamento';

  relacionadoObjeto = this.service.relacionadoObjeto;

  //item
  public objetoItemLancamento: Itemlancamento = new Itemlancamento();
  relacionado = {
    categoria: [] as Categoria[],
    metodopagamento: [] as Metodopagamento[],
    tipooperacao: [] as Tipooperacao[],
  };

  ngOnInit() {
    this.onShow();
  }

  onShow() {
    const key = this.route.snapshot.paramMap.get('id');

    this.baseService.obterObjetoRelacionado('conta', this.relacionadoObjeto);
    this.baseService.obterObjetoRelacionado(
      'statuslancamento',
      this.relacionadoObjeto
    );
    this.obterObjetoRelacionadoItem('categoria');
    this.obterObjetoRelacionadoItem('metodopagamento');
    this.obterObjetoRelacionadoItem('tipooperacao');

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
        res.dt_lancamento = formatarDataParaInput(res.dt_lancamento);
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
        this.objeto.cd_lancamento = res;
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
    console.log(this.objeto);
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
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar!',
          text: err.error.error,
          confirmButtonText: 'OK',
        });
      },
    });
  }

  obterObjetoRelacionadoItem(endpoint: string) {
    this.baseService.obterObjeto(endpoint).subscribe({
      next: (res: any) => {
        (this.relacionado as any)[endpoint] = res;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao consultar relacionamento!',
          text: err.error.error,
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
