import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyDashboardCourseCardListComponent } from './faculty-dashboard-course-card-list.component';

describe('FacultyDashboardCourseCardListComponent', () => {
  let component: FacultyDashboardCourseCardListComponent;
  let fixture: ComponentFixture<FacultyDashboardCourseCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyDashboardCourseCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyDashboardCourseCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
