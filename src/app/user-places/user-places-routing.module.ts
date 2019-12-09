import { Routes } from '@angular/router';
import { ViewPlacesComponent } from './view-places/view-places.component';

export const UserPlacesRouting: Routes = [{
  path: '',
  children: [{
    path: '',
    component: ViewPlacesComponent
  }]
}]
