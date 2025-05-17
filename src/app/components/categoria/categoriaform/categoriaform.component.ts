import { Component } from '@angular/core';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-categoriaform',
  imports: [],
  templateUrl: './categoriaform.component.html',
  styleUrl: './categoriaform.component.scss'
})
export class CategoriaformComponent
{
   public objeto: Categoria = new Categoria();
}
