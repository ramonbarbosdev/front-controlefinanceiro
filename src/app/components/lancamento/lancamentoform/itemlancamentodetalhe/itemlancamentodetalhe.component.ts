import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../../component/button/button.component";
import Swal from 'sweetalert2';
import { SelectComponent } from "../../../component/select/select.component";
import { InputNumberComponent } from "../../../component/input-number/input-number.component";
import { BaseService } from '../../../../services/base.service';

@Component({
  selector: 'app-itemlancamentodetalhe',
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    SelectComponent,
    InputNumberComponent,
  ],
  templateUrl: './itemlancamentodetalhe.component.html',
  styleUrl: './itemlancamentodetalhe.component.scss',
})
export class ItemlancamentodetalheComponent {
  @Input() objeto: any;
  @Output() objetoChange = new EventEmitter<any>();

  @Input() itemTemp: any;
  @Input() nomeItem!: string;
  @Input() relacionado: any;

  indexEditando: number | null = null;


  limparCampos()
  {
    this.itemTemp = {
      id_categoria: null,
      id_metodopagamento: null,
      id_tipooperacao: null,
      vl_movimento: null,
    };
  }

  atualizarValor(valorAtualizado: any) {
    this.objeto = valorAtualizado;
    this.objetoChange.emit(this.objeto);
  }

  adicionarItem() {
    const { id_categoria, id_metodopagamento, id_tipooperacao, vl_movimento } =
      this.itemTemp || {};

    if (
      !id_categoria ||
      !id_metodopagamento ||
      !id_tipooperacao ||
      !vl_movimento
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao adicionar!',
        text: 'Preencha todos os campos do item.',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!this.objeto[this.nomeItem]) this.objeto[this.nomeItem] = [];

    if (this.indexEditando != null) {
      this.objeto[this.nomeItem][this.indexEditando] = { ...this.itemTemp };
      this.indexEditando = null;
    } else {
      this.objeto[this.nomeItem].push({ ...this.itemTemp });
    }

    this.limparCampos();

    this.objetoChange.emit(this.objeto);
  }

  editarItem(index: number) {
    this.indexEditando = index;
    this.itemTemp = { ...this.objeto[this.nomeItem][index] };
  }

  removerItem(index: number)
  {
    this.limparCampos();
    this.objeto[this.nomeItem].splice(index, 1);
    this.objetoChange.emit(this.objeto);
  }

  getNomeRelacionado(
    campo: string,
    id: number,
    nomeCampoLista: string,
    campoId: string,
    campoNome: string
  ): string {
    const lista = this.relacionado?.[nomeCampoLista];
    return (
      lista?.find((item: any) => item[campoId] === id)?.[campoNome] ?? '---'
    );
  }
}
