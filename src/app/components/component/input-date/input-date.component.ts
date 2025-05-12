import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  imports: [FormsModule],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
})
export class InputDateComponent {
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
