import { Component, OnInit, TemplateRef, forwardRef, Inject } from '@angular/core';
import { PlaceService } from '../place.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-places',
  templateUrl: './view-places.component.html',
  styleUrls: ['./view-places.component.scss']
})
export class ViewPlacesComponent implements OnInit {
  rows: any = null;
  constructor(private placeService: PlaceService, private router: Router, private toaster: ToastrService) { }

  ngOnInit() {
    this.loadData();
  }

  /*****************************************Load All Users***************************************************************/

  loadData() {
    this.placeService.getUsers().subscribe(res => {
      if (res.status = 1 && res.data[0]) {
        this.rows = res.data;
      }

    }, error => {
      console.log(error);
    })
  }

  /*****************************************Delete Users***************************************************************/

  deleteUserDetails(user_id) {
    this.placeService.deleteUser(user_id).subscribe(res => {
      if (res.status = 1) {
        this.toaster.info(res.message, 'Success');
        this.loadData();
      }
    }, error => {
      console.log(error);
    })
  }

  /*****************************************Active/Deactive User status***************************************************************/

  updateStatus(user_id, status: number): void {
    this.placeService.updateStatus(user_id).subscribe(res => {
      if (res.status == true) {
        this.loadData();
        if (status === 0) {
          this.toaster.warning('Success', 'User Deactivated');

        } else {
          this.toaster.success('Success', 'User Activated');
        }
      }
    }, error => {
      console.log(error);
    })
  }

  /*****************************************Edit User Places***************************************************************/

  editPlaces(userId) {
    this.router.navigate(['users/places/place-form', userId])
  }

  /*****************************************View All User Places***************************************************************/
  viewPlaces(userId) {
    this.router.navigate(['users/places/view-user-places', userId])
  }
}
