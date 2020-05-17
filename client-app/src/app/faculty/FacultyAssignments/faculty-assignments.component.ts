import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../Services/Course-service';
import {ActivatedRoute} from '@angular/router';
import {FeedBackService} from '../../../Services/FeedBack-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AssignmentService} from '../../../Services/Assignment-Service';
import {from} from 'rxjs';
import {fromArray} from 'rxjs/internal/observable/fromArray';

@Component({
  selector: 'app-faculty-assignments',
  templateUrl: './faculty-assignments.component.html',
  styleUrls: ['./faculty-assignments.component.css']
})
export class FacultyAssignmentsComponent implements OnInit {
  newFilePath: string;
  fileUploaded = false;
  colorNum: number;
  CourseKey: string;
  AssignmentSubmissonForms = new Map<number, FormGroup>();
  AssignmentFilePathArray = new Map<number, Array<string>>();
  AssignmentFileUploaded = new Map<number, boolean>();
  Assignments: any;
  PendingAssignments: Array<any>;
  SubmittedAssignments: Array<any>;
  NewAssignmentForm: any;
  minDate = new Date();
  maxDate = new Date();
  picker: any;
  // const app = angular.module('fileUpload', ['ngFileUpload']);
  // tslint:disable-next-line:max-line-length
  constructor(private courseService: CourseService, private route: ActivatedRoute, private assignmentService: AssignmentService, private formBuilder: FormBuilder) { }
  async ngOnInit() {
    this.maxDate.setDate(this.minDate.getDate() + 100);
    this.colorNum = +(this.route.snapshot.params.color);
    this.CourseKey = this.route.snapshot.params.key;
    this.Assignments = await this.assignmentService.getCourseAssignment(this.CourseKey);
    this.PendingAssignments = this.Assignments.pendingAssignments;
    this.SubmittedAssignments = this.Assignments.submittedAssignments;
    this.NewAssignmentForm = this.formBuilder.group({
      dateOpened : ['', [Validators.required]],
      timeOpened : ['', [Validators.required]],
      dateSubmissionDeadline : ['', [Validators.required]],
      timeSubmissionDeadline: ['', [Validators.required]],
      assignmentDescription : ['', [Validators.required]],
      tittle : ['', [Validators.required]],
      maxPoints : ['', [Validators.required]],
      assignmentFileUrl : ['', [Validators.required]],
      courseKey: [this.CourseKey]
    });
    for (const assignment  of this.PendingAssignments) {
      assignment.dateOpened = new Date(assignment.dateOpened);
      assignment.submissionDeadline = new Date(assignment.submissionDeadline);
      const currentDate = new Date();
      if (currentDate < assignment.dateOpened || currentDate > assignment.submissionDeadline) {
        assignment.canSubmit = false;
      } else {
        assignment.canSubmit = true;
        this.AssignmentSubmissonForms.set(assignment.id, this.formBuilder.group({
          AssignmentId: assignment.id,
          details: ['', [Validators.required]]
        }));
      }
      assignment.viewSubmisson = false;
      const time1 = assignment.submissionDeadline.getTime();
      const time2 = new Date().getTime();
      const daysRemaining = (time1 - time2) / (1000 * 3600 * 24);
      if (daysRemaining < 1) {
        assignment.lessThan1Day = true;
        assignment.secondsRemaining = daysRemaining * (24 * 3600);
      } else { assignment.lessThan1Day = false; }
    }
    console.log(this.AssignmentSubmissonForms);
  }

  async onUploadClicked($event: FileList) {
    const FileArray = Array.from($event);
    console.log(FileArray);
    const formData = new FormData();
    formData.append('file', FileArray[0]);
    const path = await this.assignmentService.uploadFile(formData);
    this.newFilePath = path;
    this.fileUploaded = true;
    console.log(this.fileUploaded);
  }
  onSelectedFilesChanged($event: FileList, id: number) {
    this.newFilePath = '';
    this.fileUploaded = false;
  }

  private getTimeArray(time: string) {
    const timeStringArray = (time.split(':'));
    const timeNumArray = new Array<number>();
    for (const timeString of timeStringArray) {
      timeNumArray.push(+(timeString));
    }
    return timeNumArray;
  }
 async onRequestSubmitAssignment(id: number) {
    const submitRequest: any = {};
    submitRequest.filePaths = this.AssignmentFilePathArray.get(id);
    submitRequest.assignmentId = id;
    submitRequest.description = this.AssignmentSubmissonForms.get(id).value.details;
    const res =  await this.assignmentService.submitAssignment(submitRequest);
    console.log(res);
  }

  async postAssignment() {
    //   dateOpened : ['', [Validators.required]],
    //     timeOpened : ['', [Validators.required]],
    //     dateSubmissionDeadline : ['', [Validators.required]],
    //     timeSubmissionDeadline: ['', [Validators.required]],
    //     assignmentDescription : ['', [Validators.required]],
    //     tittle : ['', [Validators.required]],
    //     maxPoints : ['', [Validators.required]],
    //     assignmentFileUrl : ['', [Validators.required]],
    //     courseKey: [this.CourseKey]
    const formValue = this.NewAssignmentForm.value;
    const timeOpenedArr = this.getTimeArray(formValue.timeOpened);
    console.log(timeOpenedArr);
    const timeSubmissionDeadlineArr = this.getTimeArray(formValue.timeSubmissionDeadline);
    console.log(timeSubmissionDeadlineArr);
    const newDateSubmissionDeadline = formValue.dateSubmissionDeadline;
    newDateSubmissionDeadline.setHours(timeSubmissionDeadlineArr[0]);
    newDateSubmissionDeadline.setMinutes(timeSubmissionDeadlineArr[1]);
    const newDateOpened = formValue.dateOpened;
    newDateOpened.setHours(timeOpenedArr[0]);
    newDateOpened.setMinutes(timeOpenedArr[1]);
    const assignmentDto = {
      courseKey: formValue.courseKey,
      dateOpened: newDateOpened,
      submissionDeadline: newDateSubmissionDeadline,
      assignmentDescription: formValue.assignmentDescription,
      tittle: formValue.tittle,
      maxPoints: formValue.maxPoints,
      assignmentFileUrl: this.newFilePath,
    };
    const res = await this.assignmentService.PostAssignment(assignmentDto);
    console.log(res);
    window.location.reload();
  }
}
