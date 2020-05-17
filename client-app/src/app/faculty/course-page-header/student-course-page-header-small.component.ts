import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../../Services/Course-service';
import {UserService} from '../../../Services/User-service';

@Component({
  selector: 'app-faculty-course-page-header',
  templateUrl: './Faculty-course-page-header-small.component.html',
  styleUrls: ['./Faculty-course-page-header-small.component.css']
})
export class FacultyCoursePageHeaderComponent implements OnInit {
  key: string;
  colorNum: number;
  sub: any;
  course: any;
  userInfo: any;
  private snapshot: any;

  onRequestLogOut() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
  // tslint:disable-next-line:max-line-length
  constructor(private  userService: UserService, private route: ActivatedRoute, private router: Router, private courseService: CourseService) { }
  async ngOnInit() {
    this.userInfo = this.userService.getCurrentUserInfo();
    this.colorNum = +(this.route.firstChild.snapshot.params.color);
    this.key = this.route.firstChild.snapshot.params.key;
    console.log(this.colorNum);
    console.log(this.key);

    this.course = await this.courseService.getCourseInfo(this.key);
    console.log(typeof this.colorNum);

  }

  onRequestDashboard() {
    this.router.navigate(['student/dashboard']);
  }
}
