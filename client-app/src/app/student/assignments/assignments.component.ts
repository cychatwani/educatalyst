import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../Services/Course-service';
import {ActivatedRoute} from '@angular/router';
import {FeedBackService} from '../../../Services/FeedBack-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AssignmentService} from '../../../Services/Assignment-Service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  colorNum: number;
  CourseKey: string;
  AssignmentSubmissonForms = new Map<number, FormGroup>();
  AssignmentFilePathArray = new Map<number, Array<string>>();
  AssignmentFileUploaded = new Map<number, boolean>();
  Assignments: any;
  PendingAssignments: Array<any>;
  SubmittedAssignments: Array<any>;
  // const app = angular.module('fileUpload', ['ngFileUpload']);
  // tslint:disable-next-line:max-line-length
  constructor(private courseService: CourseService, private route: ActivatedRoute, private assignmentService: AssignmentService, private formBuilder: FormBuilder) { }
  async ngOnInit() {
    this.colorNum = +(this.route.snapshot.params.color);
    this.CourseKey = this.route.snapshot.params.key;
    this.Assignments = await this.assignmentService.getCourseAssignment(this.CourseKey);
    this.PendingAssignments = this.Assignments.pendingAssignments;
    this.SubmittedAssignments = this.Assignments.submittedAssignments;
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
      } else {
        if (daysRemaining < 0) {
          assignment.deadlineOver = true;
        } else {assignment.lessThan1Day = false; } }
    }
    console.log(this.PendingAssignments);
  }

  async onUploadClicked($event: FileList, id: number) {
    const FileArray = Array.from($event);
    console.log(FileArray);
    const paths = new Array<string>();
    for (const file of FileArray) {
      const formData = new FormData();
      formData.append('file', file);
      const path = await this.assignmentService.uploadFile(formData);
      paths.push(path);
    }
    this.AssignmentFilePathArray.set(id, paths);
    console.log(this.AssignmentFilePathArray);
  }

  onSelectedFilesChanged($event: FileList, id: number) {
    this.AssignmentFilePathArray.set(id, null);
  }

 async onRequestSubmitAssignment(id: number) {
    const submitRequest: any = {};
    submitRequest.filePaths = this.AssignmentFilePathArray.get(id);
    submitRequest.assignmentId = id;
    submitRequest.description = this.AssignmentSubmissonForms.get(id).value.details;
    const res =  await this.assignmentService.submitAssignment(submitRequest);
    console.log(res);
  }
}
