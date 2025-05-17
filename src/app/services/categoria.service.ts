import { Injectable } from '@angular/core';
import { Tipoconta } from '../models/tipoconta';
import { Tipocategoria } from '../models/tipocategoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { }


    relacionadoObjeto = {
      tipocategoria: [] as Tipocategoria[],
    };

}
