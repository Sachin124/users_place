import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserPlaceComponent } from './view-user-place.component';

describe('ViewUserPlaceComponent', () => {
  let component: ViewUserPlaceComponent;
  let fixture: ComponentFixture<ViewUserPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
