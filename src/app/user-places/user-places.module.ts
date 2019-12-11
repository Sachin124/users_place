import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPlacesRouting } from './user-places-routing.module';
import { ViewPlacesComponent } from './view-places/view-places.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatTooltipModule,  MatFormFieldModule, MatButtonModule,  MatIconModule } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { ViewUserPlaceComponent } from './view-user-place/view-user-place.component';

const config: InputFileConfig = {};

@NgModule({
  declarations: [ViewPlacesComponent, AddPlaceComponent, ViewUserPlaceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    InputFileModule.forRoot(config),
    MatTooltipModule,
    MatFormFieldModule,
    MatButtonModule,
    ModalModule.forRoot(),
    MatIconModule,
    RouterModule.forChild(UserPlacesRouting)
  ]
})
export class UserPlacesModule { }
