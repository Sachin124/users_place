import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';
import { InputFileComponent } from 'ngx-input-file';
import { PlaceService } from '../place.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private fb: FormBuilder, private placeService: PlaceService, private toaster: ToastrService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    let userId = this.route.snapshot.paramMap.get("id")
    let user_name = this.route.snapshot.paramMap.get("user_name")


    if (userId != 'new') {
      this.placeService.getAllPlacesById(userId).subscribe(res=>{
        if (res.status == 1) {
          this.isEditForm = true;
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

  createForm() {
    this.placeForm = this.fb.group({
      name: ['', Validators.required],
      placeDetails: this.fb.array([])
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
  addPlaceDetails() {
    const control = <FormArray>this.placeForm.controls['placeDetails'];

    const addCtrl = this.initPlaceDetails();

    control.push(addCtrl);
  }

  removePlaceDetails(i: number) {
    const control = <FormArray>this.placeForm.controls['placeDetails'];
    control.removeAt(i);
  }

  public post(fileInput, index) {
    console.log(index);

    const formdata = new FormData();
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

  save(placeDetails) {
    if (placeDetails.valid) {
      this.placeService.addNewPlace(placeDetails.value).subscribe(res=>{
        if (res.status == 1) {
         this.toaster.success(res.message, 'Success');
          this.placeForm.reset();
        }
       },error=>{
         console.log(error);

       })
    }

  }

  update(placeDetails) {
    if (placeDetails.valid) {
      this.placeService.addNewPlace(placeDetails.value).subscribe(res=>{
        if (res.status == 1) {
         this.toaster.success(res.message, 'Success');
          this.placeForm.reset();
        }
       },error=>{
         console.log(error);

       })
    }

  }

}
