import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private toaster: ToastrService) { }

  ngOnInit() {
  }

  logout():void{
    this.toaster.warning('User Logout', 'Success');
    this.userService.logout();
  }

}
