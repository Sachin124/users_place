import { Routes } from '@angular/router';
import { AfterAuthLayoutComponent } from './layout/after-auth-layout/after-auth-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AuthGuard } from './guards/auth.guard';

export const AppRoutes: Routes = [{
  path: '',
  redirectTo: 'user/login',
  pathMatch: 'full',
},{
  path: '',
  component: AfterAuthLayoutComponent,
  children: [{
    path: 'users/places',
    loadChildren: () => import('./user-places/user-places.module').then(m => m.UserPlacesModule),
    canActivate:[AuthGuard]
  }
  ]
},{
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }]
}];


