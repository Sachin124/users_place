import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../place.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-user-place',
  templateUrl: './view-user-place.component.html',
  styleUrls: ['./view-user-place.component.scss']
})
export class ViewUserPlaceComponent implements OnInit {
  savedPlaces: any;
  baseUrl= environment.imageUrl;
  constructor(private userPlaceService: PlaceService, private route: ActivatedRoute) { }

  ngOnInit() {
   let userId = this.route.snapshot.paramMap.get("userid")

   // Getting userId from routing params and serach places for that user
   this.userPlaceService.getAllPlacesById(userId).subscribe(res=>{
    this.savedPlaces = res.data;
   },error=>{
     console.log(error);
   })
  }


}
