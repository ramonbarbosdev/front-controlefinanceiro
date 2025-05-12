import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-number',
  imports: [],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
})
export class InputNumberComponent {
  @Input() label!: string;
  @Input() inputId!: string;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;

  @Input()
  set model(val: number | null) {
    this._model = val;
    this.valorFormatado = this.formatarValor(val);
  }
  get model(): number | null {
    return this._model;
  }

  @Output() modelChange = new EventEmitter<number | null>();

  _model: number | null = null;
  valorFormatado: string = '';

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const valorRaw = input.value.replace(/[^\d]/g, '');
    const valorNumerico = parseFloat(valorRaw) / 100;

    this._model = isNaN(valorNumerico) ? null : valorNumerico;
    this.valorFormatado = this.formatarValor(this._model);
    this.modelChange.emit(this._model);
  }

  private formatarValor(valor: number | null): string {
    if (valor == null) return '';
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
