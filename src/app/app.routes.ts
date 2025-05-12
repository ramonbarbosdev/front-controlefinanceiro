import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TipocontaformComponent } from './components/tipoconta/tipocontaform/tipocontaform.component';
import { TipocontalistComponent } from './components/tipoconta/tipocontalist/tipocontalist.component';
import { TipocategorialistComponent } from './components/tipocategoria/tipocategorialist/tipocategorialist.component';
import { TipocategoriaformComponent } from './components/tipocategoria/tipocategoriaform/tipocategoriaform.component';
import { ContalistComponent } from './components/conta/contalist/contalist.component';
import { ContaformComponent } from './components/conta/contaform/contaform.component';
import { LancamentolistComponent } from './components/lancamento/lancamentolist/lancamentolist.component';
import { LancamentoformComponent } from './components/lancamento/lancamentoform/lancamentoform.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: PrincipalComponent,
    canActivateChild: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tipocontalist', component: TipocontalistComponent },
      { path: 'tipocontaform/:id', component: TipocontaformComponent },
      { path: 'tipocontaform', component: TipocontaformComponent },
      { path: 'tipocategorialist', component: TipocategorialistComponent },
      { path: 'tipocategoriaform/:id', component: TipocategoriaformComponent },
      { path: 'tipocategoriaform', component: TipocategoriaformComponent },
      { path: 'contalist', component: ContalistComponent },
      { path: 'contaform', component: ContaformComponent },
      { path: 'contaform/:id', component: ContaformComponent },
      { path: 'lancamentolist', component: LancamentolistComponent },
      { path: 'lancamentoform', component: LancamentoformComponent },
      { path: 'lancamentoform/:id', component: LancamentoformComponent },
    ],
  },
];
