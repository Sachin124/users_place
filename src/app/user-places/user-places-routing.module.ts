import { Routes } from '@angular/router';
import { ViewPlacesComponent } from './view-places/view-places.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { ViewUserPlaceComponent } from './view-user-place/view-user-place.component';

export const UserPlacesRouting: Routes = [{
  path: '',
  children: [{
    path: '',
    component: ViewPlacesComponent
  },{
    path: 'place-form/:id',
    component: AddPlaceComponent
  },{
    path: 'view-user-places/:userid',
    component: ViewUserPlaceComponent
  }]
}]
