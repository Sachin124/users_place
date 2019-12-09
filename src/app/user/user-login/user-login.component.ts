import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  loginData: any = {};
  isLoggedIn: boolean = false;
  mobilePattern:any=/^[6-9]\d{9}$/;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService, private cookieService: CookieService) { }

  ngOnInit() {

  }

  login(formValue: NgForm) {
    console.log(formValue);
    if (formValue.invalid == false) {
      this.isLoggedIn = true;

      this.userService.login(formValue.value).subscribe(res => {
        console.log(res);
        if (res.status == true) {
          this.toastr.success(res.message, 'Success')

          this.cookieService.set('currentUser', JSON.stringify(res));
          setTimeout(() => {
            this.isLoggedIn = false;
            this.router.navigate(['/users/places']);
          }, 2000);
        }

      }, error => {
        this.toastr.error(error.error.errors, 'Error')
        setTimeout(() => {
          this.isLoggedIn = false;
        }, 2000);
      })
    }

  }
}
