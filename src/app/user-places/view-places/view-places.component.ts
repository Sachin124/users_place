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
  rows: any;
  constructor( private placeService: PlaceService, private router: Router, private toaster: ToastrService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.placeService.getUsers().subscribe(res=>{
      console.log(res);
      if (res.status = 1) {
        this.rows = res.data;
      }

    },error=>{
      console.log(error);
    })
  }
  deleteUserDetails(user_id){
    this.placeService.deleteUser(user_id).subscribe(res=>{
      if (res.status = 1) {
        this.toaster.info(res.message, 'Success');
        this.loadData();
      }

    },error=>{
      console.log(error);
    })
  }

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

  editPlaces(userId){
    this.router.navigate(['users/places/place-form', userId])
  }

  viewPlaces(userId){
    this.router.navigate(['users/places/view-user-places', userId])
  }
}
