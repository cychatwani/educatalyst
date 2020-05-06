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
  routeMap = new Map();
  routeMessage: string;
  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) { }
  async ngOnInit() {
    this.routeMap.set('classmates', 'Your Classmates');
    this.routeMap.set('DoubtQNA', 'Ask Your Instructor');
    this.routeMap.set('Announcements', 'Announcements by course instructor');
    this.sub = await this.route.params.subscribe(params => {
      this.colorNum = +(params.color);
      this.key = params.key;
    });
    const url = this.route.snapshot['_routerState'].url;
    this.routeMessage = url.split('/')[3];
    console.log(this.routeMessage);
    this.course = await this.courseService.getCourseInfo(this.key);
    console.log(typeof this.colorNum);

  }

  requestGoback() {
    this.router.navigate(['student/dashboard']);
  }
}
