import { CommonModule, Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() titulo: string | undefined;
  @Input() form: string | undefined;
  @Input() fl_list: boolean | undefined;
  router = inject(Router);
  location = inject(Location);

  onClose()
  {
    if (this.fl_list)
      {
      this.router.navigate(['admin/dashboard']);
    }
    else
    {
      this.location.back();
    }
  }

  onNew() {
    this.router.navigate(['admin/' + this.form]);
  }
}
