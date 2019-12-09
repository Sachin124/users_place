import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';


export const UserRoutingModule: Routes = [{
  path: '',
  children: [{
    path: 'login',
    component: UserLoginComponent
  },{
    path: 'sign-up',
    component: UserSignUpComponent
  }]
}]
