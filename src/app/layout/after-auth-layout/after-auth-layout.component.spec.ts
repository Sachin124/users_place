import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterAuthLayoutComponent } from './after-auth-layout.component';

describe('AfterAuthLayoutComponent', () => {
  let component: AfterAuthLayoutComponent;
  let fixture: ComponentFixture<AfterAuthLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterAuthLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
