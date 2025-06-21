import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from './auth-guard';
import { MainLayout } from './components/shared/main-layout/main-layout';
import { permissionGuard } from './permission-guard';
import { RolesComponent } from './pages/admin/roles-management/roles-management';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/admin/home/home').then((m) => m.HomeComponent),
      },
      // {
      //   path: 'articles',
      //   component: ArticlesPage,
      //   canActivate: [authGuard, permissionGuard('creates-articles')],
      // },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [authGuard, permissionGuard('manage-roles')],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./components/unauthorized/unauthorized').then(
        (m) => m.Unauthorized
      ),
  },
];
