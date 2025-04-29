import { Component, HostListener, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private auth = inject(AuthService);
  menuAberto = false;
  termoBusca = '';

  dropdownAberto = false;

  @HostListener('document:click', ['$event'])
  fecharDropdownAoClicarFora(event: MouseEvent) {
    const alvo = event.target as HTMLElement;

    // Verifica se o clique foi fora do dropdown
    if (!alvo.closest('.dropdown')) {
      this.dropdownAberto = false;
    }
  }

  sair() {
    this.auth.logout();
  }

  buscar() {
    console.log(this.termoBusca);
  }
}
