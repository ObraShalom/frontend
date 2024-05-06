import { Routes } from '@angular/router';
// import { BaseComponent } from './layout/base/base.component';
import { LoginComponent } from './layout/login/login.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./layout/base/base.component') },
    {
        path: 'pages', loadComponent: () => import('./layout/base/base.component'),
        children: [{ path: '', loadChildren: () => import('./pages/pages.routes') }],
        canActivate: [authGuard]
    },
    { path: 'login', component: LoginComponent },
    {
      path: '',
      redirectTo: 'pages',
      pathMatch: 'full'
    }
];
