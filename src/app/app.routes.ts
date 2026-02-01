import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },

  {
    path: 'supplier-orders',
    canActivate: [authGuard],
    data: { roles: ['GESTIONNAIRE_APPROVISIONNEMENT', 'ADMIN'] },
    loadComponent: () => import('./features/admin/supplier-orders/supplier-orders.component')
      .then(m => m.SupplierOrdersComponent)
  },
  
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: ()=> import('./features/admin/dashboard/dashboard.component')
    .then(m => m.DashboardComponent)
  },

    {
    path: 'fournisseurs',
    canActivate: [authGuard],
    loadComponent: ()=> import('./features/admin/supplier-management/supplier-management.component')
    .then(m => m.SupplierManagementComponent)
  },

  {
    path: 'raw-material',
    canActivate: [authGuard],
    loadComponent: ()=> import('./features/admin/raw-material-managment/raw-material-managment.component')
    .then(m => m.RawMaterialManagmentComponent)
  },

  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () => import('./features/admin/product-management/product-management.component')
      .then(m => m.ProductManagementComponent)
  },


  

  

  
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () => import('./features/admin/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },

  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/components/unauthorized/unauthorized.component')
      .then(m => m.UnauthorizedComponent)
  },
  
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];
