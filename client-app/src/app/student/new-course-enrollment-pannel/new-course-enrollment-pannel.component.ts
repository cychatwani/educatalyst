import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../../../Services/Course-service';
import {MatSnackBar} from '@angular/material';
import {StudentDashboardCourseCardListComponent} from '../student-dashboard-course-card-list/student-dashboard-course-card-list.component';

@Component({
  selector: 'app-new-course-enrollment-pannel',
  templateUrl: './new-course-enrollment-pannel.component.html',
  styleUrls: ['./new-course-enrollment-pannel.component.css']
})
export class NewCourseEnrollmentPannelComponent implements OnInit {
  newCourseForm1: FormGroup;

  // tslint:disable-next-line:variable-name max-line-length
  constructor(private cardComp: StudentDashboardCourseCardListComponent, private formBuilder: FormBuilder, private courseService: CourseService, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
  onRequestEnroll() {
    const key = this.newCourseForm1.value.courseKey;
    this.courseService.enroll(key)
      .then(result => {
        // this.openSnackBar('Success', 'You Are Enrolled');
        result.subscribe((res: any) => {
          if (res.message === 'INVALID') {
            this.openSnackBar('ERROR', 'Course with entered key was not found.');
          } else if (res.message === 'Course Full') {
            this.openSnackBar('ERROR', 'Course is already full. Please contact your Instructor');
          } else if (res.message === 'Success') {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        });
      })
      .catch(reason => {
      console.log(reason);
      this.openSnackBar('Error', 'Something went wrong');
    });
  }
  ngOnInit() {
    this.newCourseForm1 = this.formBuilder.group({
      courseKey: ['', [Validators.required]]
    });
  }

}
