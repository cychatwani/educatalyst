import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../Services/Course-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student-dashboard-course-card-list',
  templateUrl: './student-dashboard-course-card-list.component.html',
  styleUrls: ['./student-dashboard-course-card-list.component.css']
})
export class StudentDashboardCourseCardListComponent implements OnInit {
  courses: any;

  constructor(private courseService: CourseService, private router: Router) {
  }

  ngOnInit() {
     this.courseService.getStudentCourses().then((courseResponce: {result: any}) => {
       console.log(courseResponce);
       this.courses = courseResponce.result;
       console.log(this.courses);
     });
     console.log(this.courses);
  }

  onRequestOfCourseHome(courseKey: any, i: number) {
    this.router.navigate(['student/course/Announcements', courseKey, i]);
  }
}
