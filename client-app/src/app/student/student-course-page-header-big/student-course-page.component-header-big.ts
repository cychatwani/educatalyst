import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../../Services/Course-service';
import {core} from '@angular/compiler';

@Component({
  selector: 'app-student-course-page-header-big',
  templateUrl: './student-course-page.component-header-big.html',
  styleUrls: ['./student-course-page.component.-header-big.css']
})
export class StudentCoursePageHeaderBigComponent implements OnInit {
  coverImage = {};
  key: string;
  colorNum: number;
  sub: any;
  course: any;
  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) { }

  async ngOnInit() {
    this.sub = await this.route.params.subscribe(params => {
      this.colorNum = +(params.color);
      this.key = params.key;
    });
    this.course = await this.courseService.getCourseInfo(this.key);
    console.log(typeof this.colorNum);

  }

  requestGoback() {
    this.router.navigate(['student/dashboard']);
  }
}
