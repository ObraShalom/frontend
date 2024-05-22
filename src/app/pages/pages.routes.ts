import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../core/guard/auth.guard';

export const routes: Routes = [
    {path : '', component : DashboardComponent},
];

export default routes;
