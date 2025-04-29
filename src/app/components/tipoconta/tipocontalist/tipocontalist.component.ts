import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TipocontaService } from '../../../services/tipoconta.service';
import { Tipoconta } from '../../../models/tipoconta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipocontalist',
  imports: [CommonModule],
  templateUrl: './tipocontalist.component.html',
  styleUrl: './tipocontalist.component.scss',
})
export class TipocontalistComponent implements OnInit {

  public objetos: Tipoconta[] | any = [];

  service = inject(TipocontaService);
  router = inject(Router);

  ngOnInit() {
    this.onReload();
  }

  onReload() {
    this.service.obterTodos().subscribe((res) => {
       this.objetos = res;
    });
  }

  onEdit(item: any)
  {
    if (item) this.router.navigate(
      ['admin/tipocontaform', item.id_tipoconta]
    );
  }

  deletar(id: number) {}
}
