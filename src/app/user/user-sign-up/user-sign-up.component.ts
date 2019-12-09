import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss']
})
export class UserSignUpComponent implements OnInit {
  userData: any = {};
  passordMismatch: string = null;
  emailPattern:any=/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
  mobilePattern:any=/^[6-9]\d{9}$/;
  passwordPattern:any=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  constructor(private toastr: ToastrService,private router:Router, private userService: UserService) { }

  ngOnInit() {
  }

  /** Add New User */
  signup(userData: NgForm) {
    if (userData.value.password != userData.value.confirm_password) {
      this.passordMismatch = 'Password Not match!'
    } else if (userData.invalid === false) {
      this.userService.addNewUser(userData.value).subscribe(res => {
        if (res.status == 1) {
          this.toastr.success('Success', res.message);
          this.router.navigate(['/user/login']);
        } else {
          this.toastr.error('error', res.message);
        }
      }, error => {
        console.log(error);
        this.toastr.error('error', error.error.err[0].msg);
      });
    }
  }

}
