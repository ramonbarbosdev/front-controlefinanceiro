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
  ],
  templateUrl: './lancamentoform.component.html',
  styleUrl: './lancamentoform.component.scss',
})
export class LancamentoformComponent {
  public objeto: Lancamento = new Lancamento();
  public objetoConta: Conta[] | any = [];
  public objetoStatus: Statuslancamento[] | any = [];

  service = inject(LancamentoService);
  baseService = inject(BaseService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  location = inject(Location);
  nm_titulo = 'Cadastrar Lançamento';

  ngOnInit() {
    this.onShow();
  }

  onShow() {
    const key = this.route.snapshot.paramMap.get('id');

    this.obterConta();
    this.obterStatusLancamento();

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

  obterConta() {
    this.baseService.obterObjeto('conta').subscribe({
      next: (res: any) => {
        this.objetoConta = res;
      },
    });
  }

  obterStatusLancamento() {
    this.baseService.obterObjeto('statuslancamento').subscribe({
      next: (res: any) => {
        this.objetoStatus = res;
      },
    });
  }
}
