import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        title: 'Inicio',
        loadComponent: () => import('./features/public/home/home').then(m => m.Home)
      },
      {
        path: 'login',
        title: 'Iniciar Sesión',
        loadComponent: () => import('./features/public/login/login').then(m => m.Login)
      },

    ]
  },

  // ADMIN
  {
    path: 'admin',
    component: AdminLayout,
    // canActivate: [AuthGuard,
    //  AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        title: 'Admin - Panel',
        loadComponent: () => import('./features/admin/dashboard/dashboard').then(m => m.Dashboard)
      },
      
  
    ]
  },

  // Manejo de errores (404)
  //   { 
  //     path: 'no-encontrado',
  //     title: 'Página no encontrada',
  //     loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent) 
  //   },
  { path: '**', redirectTo: 'no-encontrado' }
];