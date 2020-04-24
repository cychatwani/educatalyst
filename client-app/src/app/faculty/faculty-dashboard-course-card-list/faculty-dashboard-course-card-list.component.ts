import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../Services/Course-service';

@Component({
  selector: 'app-faculty-dashboard-course-card-list',
  templateUrl: './faculty-dashboard-course-card-list.component.html',
  styleUrls: ['./faculty-dashboard-course-card-list.component.css']
})
export class FacultyDashboardCourseCardListComponent implements OnInit {
  courses: any;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    console.log('I am Initialised');
    this.courseService.getFacultyCourses().then((courseResponce: {result: any}) => {
      console.log(courseResponce);
      this.courses = courseResponce.result;
      console.log(this.courses);
    });
    console.log(this.courses);
  }

}
