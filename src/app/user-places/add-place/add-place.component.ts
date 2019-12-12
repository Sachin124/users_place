import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';
import { InputFileComponent } from 'ngx-input-file';
import { PlaceService } from '../place.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {
  @ViewChild(InputFileComponent, { static: false })
  private InputFileComponent: InputFileComponent;
  placeForm: FormGroup;
  savedPlaces: any;
  isEditForm: boolean = false;
  baseUrl = environment.imageUrl;
  isImageShow: boolean =false;
  userName: string = 'Add New Places';
  constructor(private fb: FormBuilder,private router: Router, private placeService: PlaceService, private toaster: ToastrService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    let userId = this.route.snapshot.paramMap.get("id")
    if (userId != 'new') { // If it is edit form
      this.placeService.getAllPlacesById(userId).subscribe(res=>{
        if (res.status == 1) {
          this.isEditForm = true;
          this.isImageShow = true;
          this.userName = `Edit ${res.data[0].full_name}`
          this.placeForm.controls['name'].setValue(res.data[0].full_name);
          // this.placeForm.setControl('placeDetails', this.fb.array(res.data || []));
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            this.addPlaceDetails();
            let faControl = (<FormArray>this.placeForm.controls['placeDetails']).at(index);
            faControl['controls'].place_name.setValue(element.place_name);
            faControl['controls'].description.setValue(element.description);
            faControl['controls'].image_path.setValue(element.image_path);
            faControl['controls'].address.setValue(element.address);
          }
        }
      },error=>{
        console.log(error);
      })
    }else{
      this.addPlaceDetails();
    }
  }
  get placeDetails(): FormArray {
		return this.placeForm.get('placeDetails') as FormArray;
	}


  /* Creating the New Form which is reactive nested form */
  createForm() {
    this.placeForm = this.fb.group({
      name: ['', Validators.required],
      placeDetails: this.fb.array([]) // Nested Reactive form for multiple places deteails
    });
  }

  initPlaceDetails() {
    return this.fb.group({
      place_name: ['', Validators.required],
      description: ['', Validators.required],
      image_path: [''],
      address: ['', Validators.required]
    })
  }

  /* Add new place form */

  addPlaceDetails() {
    const control = <FormArray>this.placeForm.get('placeDetails');

    const addCtrl = this.initPlaceDetails();

    control.push(addCtrl);
  }

  /* Remove the place */

  removePlaceDetails(i: number) {
    const control = <FormArray>this.placeForm.get('placeDetails');
    control.removeAt(i);
  }


  /* Uploading the place image*/


  public post(fileInput, index) {
    const formdata = new FormData();
    this.isImageShow = false;
    const image: File = <File>this.InputFileComponent.files[0].file;
    formdata.append('image', image)
    this.placeService.addPlaceImage(formdata).subscribe(res => {
      if (res.status == true) {
        let faControl = (<FormArray>this.placeForm.controls['placeDetails']).at(index);
            faControl['controls'].image_path.setValue(res.image);
      }
    }, error => {
      console.log(error);
    })
  }

  /* Saving User details with places  */

  save(placeDetails) {
    if (placeDetails.valid) {
      this.placeService.addNewPlace(placeDetails.value).subscribe(res=>{
        if (res.status == 1) {
         this.toaster.success(res.message, 'Success');
         this.router.navigate(['users/places']);
          this.placeForm.reset();
        }
       },error=>{
         console.log(error);
       })
    }
  }

  /* Updating User details with places  */

  update(placeDetails) {
    if (placeDetails.valid) {
      this.placeService.updatePlace(placeDetails.value, this.route.snapshot.paramMap.get("id")).subscribe(res=>{
        if (res.status == 1) {
         this.toaster.info(res.message, 'Success');
         this.router.navigate(['users/places']);
        }
       },error=>{
         console.log(error);
       })
    }
  }

}
