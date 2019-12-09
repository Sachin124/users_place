import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from 'src/app/shared/navbar/navbar/navbar.component';

@Component({
  selector: 'app-after-auth-layout',
  templateUrl: './after-auth-layout.component.html',
  styleUrls: ['./after-auth-layout.component.scss']
})
export class AfterAuthLayoutComponent implements OnInit {
  @ViewChild(NavbarComponent, {static: false}) navbar: NavbarComponent;

  constructor() { }

  ngOnInit() {
  }

}
