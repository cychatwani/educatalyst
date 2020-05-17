import { Component, OnInit } from '@angular/core';
import {FeedBackService} from '../../../Services/FeedBack-service';
import {CourseService} from '../../../Services/Course-service';
import {DoubtQNAService} from '../../../Services/Doubt-QNA-Service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-lecture-feedback',
  templateUrl: './lecture-feedback.component.html',
  styleUrls: ['./lecture-feedback.component.css']
})
export class LectureFeedbackComponent implements OnInit {
  Lectures: any;
  RatedLectures: Array<any>;
  UnRatedLectures: Array<any>;
  CourseKey: string;
  FormGroups = new Map<number, FormGroup>();
  CourseInfo: any;
  private colorNum: number;
  // tslint:disable-next-line:max-line-length
  constructor(private courseService: CourseService, private route: ActivatedRoute, private feedBackService: FeedBackService, private formBuilder: FormBuilder) { }
  async  ngOnInit() {
    this.colorNum = +(this.route.snapshot.params.color);
    console.log(this.colorNum);
    this.CourseKey = this.route.snapshot.params.key;
    this.CourseInfo =  await this.courseService.getCourseInfo(this.CourseKey);
    this.Lectures = await this.feedBackService.getLectures(this.CourseKey);
    this.RatedLectures = this.Lectures.ratedLectures;
    this.UnRatedLectures = this.Lectures.unRatedLectures;
    for (const lecture of this.UnRatedLectures) {
      this.FormGroups.set(lecture.id, this.formBuilder.group({
        rating: ['', [Validators.required]],
        comment: ['']
      }));
      lecture.showFeedBackForm = false;
      lecture.realDate = new Date(lecture.lectureDate);
      let timeArrays = lecture.startTime.split(':');
      const startTimeArray = new Array<number>(3);
      for (let i = 0; i < 3; i++) {
        startTimeArray[i] = +(timeArrays[i]);
      }
      lecture.startTime = startTimeArray;
      timeArrays = lecture.endTime.split(':');
      const endTimeArray = new Array<number>(3);
      for (let i = 0; i < 3; i++) {
        endTimeArray[i] = +(timeArrays[i]);
      }
      lecture.endTime = endTimeArray;
      // tslint:disable-next-line:max-line-length
      const startDate: Date = new Date(lecture.realDate.getFullYear(), lecture.realDate.getMonth(), lecture.realDate.getDate(), startTimeArray[0], startTimeArray[1], startTimeArray[2], 0);
      // tslint:disable-next-line:max-line-length
      const endDate: Date = new Date(lecture.realDate.getFullYear(), lecture.realDate.getMonth(), lecture.realDate.getDate(), endTimeArray[0], endTimeArray[1], endTimeArray[2], 0);
      const feedBackDate = endDate.getDate() + 1;
      console.log(feedBackDate);
      // tslint:disable-next-line:max-line-length
      const FeedBackDeadlineDate = new Date(lecture.realDate.getFullYear(), lecture.realDate.getMonth(), feedBackDate, endTimeArray[0], endTimeArray[1], endTimeArray[2], 0);;
      lecture.startDate = startDate;
      lecture.endDate = endDate;
      lecture.FeedBackDeadlineDate = FeedBackDeadlineDate;
      const CurrentDateTime = new Date();
      if (CurrentDateTime < endDate) {
        lecture.canSubmit = false;
        lecture.expired = false;
       } else if (CurrentDateTime > FeedBackDeadlineDate) {
        lecture.canSubmit = false;
        lecture.expired = true;
      } else { lecture.canSubmit = true; }
    }
    for (const lecture of this.RatedLectures) {
      lecture.realDate = new Date(lecture.lectureDate);
      let timeArrays = lecture.startTime.split(':');
      const startTimeArray = new Array<number>(3);
      for (let i = 0; i < 3; i++) {
        startTimeArray[i] = +(timeArrays[i]);
      }
      lecture.startTime = startTimeArray;
      timeArrays = lecture.endTime.split(':');
      const endTimeArray = new Array<number>(3);
      for (let i = 0; i < 3; i++) {
        endTimeArray[i] = +(timeArrays[i]);
      }
      lecture.endTime = endTimeArray;
      // tslint:disable-next-line:max-line-length
      const startDate: Date = new Date(lecture.realDate.getFullYear(), lecture.realDate.getMonth(), lecture.realDate.getDate(), startTimeArray[0], startTimeArray[1], startTimeArray[2], 0);
      // tslint:disable-next-line:max-line-length
      const endDate: Date = new Date(lecture.realDate.getFullYear(), lecture.realDate.getMonth(), lecture.realDate.getDate(), endTimeArray[0], endTimeArray[1], endTimeArray[2], 0);
      const feedBackDate = endDate.getDate() + 1;
      console.log(feedBackDate);
      // tslint:disable-next-line:max-line-length
      const FeedBackDeadlineDate = new Date(lecture.realDate.getFullYear(), lecture.realDate.getMonth(), feedBackDate, endTimeArray[0], endTimeArray[1], endTimeArray[2], 0);;
      lecture.startDate = startDate;
      lecture.endDate = endDate;
      lecture.FeedBackDeadlineDate = FeedBackDeadlineDate;
      const CurrentDateTime = new Date();
      if (CurrentDateTime > FeedBackDeadlineDate || CurrentDateTime < endDate) {
        lecture.canSubmit = false;
      } else { lecture.canSubmit = true; }
    }
    console.log(this.UnRatedLectures);
  }
  async onRequestSubmitFeedBack(id: number) {
    const formValue = this.FormGroups.get(id).value;
    const feedBackDto = {
      ratings: formValue.rating,
      comment: formValue.comment,
      lectureId: id
    };
    const res = await this.feedBackService.postFeedBack(feedBackDto);
    window.location.reload();
    // console.log(res);
  }
}
