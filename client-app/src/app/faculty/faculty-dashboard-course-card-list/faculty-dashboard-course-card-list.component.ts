import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../Services/Course-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-faculty-dashboard-course-card-list',
  templateUrl: './faculty-dashboard-course-card-list.component.html',
  styleUrls: ['./faculty-dashboard-course-card-list.component.css']
})
export class FacultyDashboardCourseCardListComponent implements OnInit {
  courses: any;

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    console.log('I am Initialised');
    this.courseService.getFacultyCourses().then((courseResponce: {result: any}) => {
      console.log(courseResponce);
      this.courses = courseResponce.result;
      console.log(this.courses);
    });
    console.log(this.courses);
  }

  onRequestOfCourseHome(courseKey: any, i: number) {
    this.router.navigate(['faculty/course/Announcements', courseKey, i]);
  }
}
