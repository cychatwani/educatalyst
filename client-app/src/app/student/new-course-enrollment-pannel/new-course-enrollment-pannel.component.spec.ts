import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourseEnrollmentPannelComponent } from './new-course-enrollment-pannel.component';

describe('NewCourseEnrollmentPannelComponent', () => {
  let component: NewCourseEnrollmentPannelComponent;
  let fixture: ComponentFixture<NewCourseEnrollmentPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCourseEnrollmentPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCourseEnrollmentPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
