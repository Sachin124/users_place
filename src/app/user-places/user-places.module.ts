import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPlacesRouting } from './user-places-routing.module';
import { ViewPlacesComponent } from './view-places/view-places.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatTooltipModule,  MatFormFieldModule, MatButtonModule,  MatIconModule } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [ViewPlacesComponent, AddPlaceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatButtonModule,
    ModalModule.forRoot(),
    MatIconModule,
    RouterModule.forChild(UserPlacesRouting)
  ]
})
export class UserPlacesModule { }
