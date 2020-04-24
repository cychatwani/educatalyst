import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourseCreatePannelComponent } from './new-course-create-pannel.component';

describe('NewCourseCreatePannelComponent', () => {
  let component: NewCourseCreatePannelComponent;
  let fixture: ComponentFixture<NewCourseCreatePannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCourseCreatePannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCourseCreatePannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
