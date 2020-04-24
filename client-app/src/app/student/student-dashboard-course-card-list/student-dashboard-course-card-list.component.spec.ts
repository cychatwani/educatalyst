import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardCourseCardListComponent } from './student-dashboard-course-card-list.component';

describe('StudentDashboardCourseCardListComponent', () => {
  let component: StudentDashboardCourseCardListComponent;
  let fixture: ComponentFixture<StudentDashboardCourseCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDashboardCourseCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardCourseCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
