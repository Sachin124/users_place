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

  home(){
    this.userService.goHome();
  }

  logout():void{
    this.userService.logout();

    this.toaster.warning('User Logout', 'Success');
  }

}
