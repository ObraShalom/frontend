import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../core/guard/auth.guard';
import GrupoJovenesComponent from './grupo-oraciones/grupo-jovenes/grupo-jovenes.component';
import { GrupoAdultosComponent } from './grupo-oraciones/grupo-adultos/grupo-adultos.component';
import { GrupoAbiertosComponent } from './grupo-oraciones/grupo-abiertos/grupo-abiertos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ObraComponent } from './obra/obra.component';

export const routes: Routes = [
    {path : '', component : DashboardComponent},
    {path : 'usuarios', component : UsuariosComponent},
    {path : 'grupos/jovenes', component : GrupoJovenesComponent},
    {path : 'grupos/adultos', component : GrupoAdultosComponent},
    {path : 'grupos/abiertos', component : GrupoAbiertosComponent},
    {path : 'obra', component : ObraComponent},	
];

export default routes;
