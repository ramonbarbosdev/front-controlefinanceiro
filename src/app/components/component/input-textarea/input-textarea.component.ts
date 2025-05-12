import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-textarea',
  imports: [],
  templateUrl: './input-textarea.component.html',
  styleUrl: './input-textarea.component.scss',
})
export class InputTextareaComponent {
  @Input() model: any;
  @Output() modelChange = new EventEmitter<any>();

  @Input() label!: string;
  @Input() inputId!: string;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.modelChange.emit(value);
  }
}
