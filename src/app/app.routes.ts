import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TipocontaformComponent } from './components/tipoconta/tipocontaform/tipocontaform.component';
import { TipocontalistComponent } from './components/tipoconta/tipocontalist/tipocontalist.component';


export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: PrincipalComponent, canActivateChild: [authGuard], children:
        [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'tipocontalist', component: TipocontalistComponent},
            {path: 'tipocontaform/:id', component: TipocontaformComponent},
            {path: 'tipocontaform', component: TipocontaformComponent},

        ]
    },
];
