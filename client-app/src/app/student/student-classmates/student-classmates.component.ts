import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../../Services/Course-service';

@Component({
  selector: 'app-student-classmates',
  templateUrl: './student-classmates.component.html',
  styleUrls: ['./student-classmates.component.css']
})
export class StudentClassmatesComponent implements OnInit {
  displayedColumns: string[] = [ 'Name', 'Email', 'Phone'];
  key: string;
  colorNum: number;
  private sub: any;
  private course: any;
  private mates: [];

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) { }

  async ngOnInit() {
    this.sub = await this.route.params.subscribe(params => {
      this.colorNum = +(params.color);
      this.key = params.key;
    });
    this.course = await this.courseService.getCourseInfo(this.key);
    this.mates = this.course.enroledStudents;

    console.log(this.mates);
  }

}
