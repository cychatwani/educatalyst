import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
// @ts-ignore
import {Course} from '../../../Models/Course.Ts';
import {CourseService} from '../../../Services/Course-service';
import {MatSnackBar} from '@angular/material';
import {dashCaseToCamelCase} from '@angular/compiler/src/util';
import {FacultyDashboardCourseCardListComponent} from '../faculty-dashboard-course-card-list/faculty-dashboard-course-card-list.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-course-create-pannel',
  templateUrl: './new-course-create-pannel.component.html',
  styleUrls: ['./new-course-create-pannel.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class NewCourseCreatePannelComponent implements OnInit {
  newCourseForm1: FormGroup;
  newCourseForm2: FormGroup;
  // comp: FacultyDashboardCourseCardListComponent;
  capacityPattern = '^([1-9][0-9]{0,2}|1000)$';
  urlPattern = '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$';

  // tslint:disable-next-line:variable-name max-line-length
  constructor(private formBuilder: FormBuilder, private courseService: CourseService, private _snackBar: MatSnackBar, private router: Router) { }
  Setform2validations() {
    this.newCourseForm2.get('courseCoverImageUrl').valueChanges.subscribe(coverImage => {
      if (coverImage === 'other') {
        const custom =  this.newCourseForm2.get('customCourseCoverImageUrl');
        custom.setValidators([Validators.required, Validators.pattern(this.urlPattern)]);
      }
    });
  }

  onRequestCreate() {
    const dataFrom1 = this.newCourseForm1.value;
    const dataFrom2 = this.newCourseForm2.value;
    const course = {
      id : '',
      course_name : dataFrom1.courseName,
      courseKey : '',
      course_email : dataFrom1.courseEmail,
      course_cover_image_url : '',
      course_description : dataFrom1.courseDetails,
      course_capacity : dataFrom2.courseCapacity
    };
    if (dataFrom2.courseCoverImageUrl === 'other') {
      course.course_cover_image_url = dataFrom2.customCourseCoverImageUrl;
    } else {
      course.course_cover_image_url = dataFrom2.courseCoverImageUrl;
    }
    this.courseService.makeNewCourse(course)
      .then((result) => {
        console.log(result);
        this.router.navigate(['faculty/dashboard']);
    })
      .catch((reason) => {
        console.log(course);
      this.openSnackBar('Error', 'Something wrong went');
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
  ngOnInit() {
    // this.comp.ngOnInit();
   this.newCourseForm1 = this.formBuilder.group({
      courseEmail: ['', [Validators.required, Validators.email]],
      courseName: ['', [Validators.required]],
      courseDetails: ['', [Validators.required]],
    });
   this.newCourseForm2 = this.formBuilder.group({
     courseCapacity: ['30', [Validators.required, Validators.pattern(this.capacityPattern)]],
     courseCoverImageUrl: ['', [Validators.required]],
     customCourseCoverImageUrl: [''],
   });
   this.Setform2validations();

  }



}
