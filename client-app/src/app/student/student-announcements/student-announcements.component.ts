import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../Services/Course-service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ArrayType} from '@angular/compiler';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

interface NestedComment {
  id: number;
  comment: string;
  commenter: object;
  level: number;
  // expandable: boolean;
  replyComments: Array<NestedComment>;
}

@Component({
  selector: 'app-student-announcements',
  templateUrl: './student-announcements.component.html',
  styleUrls: ['./student-announcements.component.css']
})

export class StudentAnnouncementsComponent implements OnInit {
  private sub: any;
  private course: any;
  private announcements: Array<any>;
  private colorNum: number;
  private key: string;
  private showCommentSection: Array<boolean>;
  private loadingComments: Array<boolean>;
  private commentValueSubjects: Array<Subject<any>>;
  private treeControls = new  Array<NestedTreeControl<NestedComment>>();
  private dataSources = new Array<MatTreeNestedDataSource<NestedComment>>();
  private replyForms = new Map<number, FormGroup>();
  private commentForms =  new Map<number, FormGroup>();
  private showCommentSectionReply = new Map<number, boolean>();

  // @ts-ignore
  // treeControl = new NestedTreeControl<NestedComment>(dataNode => dataNode.replyComments);
  // dataSource = new MatTreeNestedDataSource<NestedComment>();
   hasChild = (_: number, node: NestedComment) => !!node.replyComments && node.replyComments.length > 0;
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, private formBuilder: FormBuilder) {
  }
  async showComments(i: number) {
    // console.log('console');
    this.showCommentSection[i] = !(this.showCommentSection[i]);
    if (this.showCommentSection[i]) {
      this.loadingComments[i] = true;
      const commentObject = await this.courseService.getAnnouncemetComments(this.announcements[i].id);
      this.loadingComments[i] = false;
      const commentArray = new Array<any>();
      const IdsArr = this.getCommentInfoList(commentObject, 'announcement', this.announcements[i].id);
      console.log(commentObject);
      console.log(IdsArr);
      // @ts-ignore
      for (const tempComment of commentObject) {
      commentArray.push(tempComment);
    }
      this.dataSources[i].data = commentArray;
      for (const id of IdsArr) {
        this.showCommentSectionReply.set(id, false);
        this.replyForms.set(id, this.formBuilder.group({
          replyID: [id],
          replyComment: ['', [Validators.required]],
          replyType: ['comment']
        }));
      }
    }
  }
  // const arr = new Array<number>();
  getCommentInfoList(commentArray: any, replyType: string, replyId: number) {
    const arr  = new Array<number>();
    function recursiveHelper(CommentArray: any, ReplyType: string, ReplyId: number) {
      for (const comment of  CommentArray) {
        if (comment.replyComments.length !== 0) {
          recursiveHelper(comment.replyComments, 'comment', comment.id);
        }
        arr.push(comment.id);
      }
    }
    recursiveHelper(commentArray, replyType, replyId);
    return arr;
  }
  transformer(commentObject: any, level: number) {
    return{
      expandable: (commentObject.replyComments.length !== 0),
      comment: commentObject.comment,
      level,
      commenter: commentObject.commenter
    };
  }
  async ngOnInit() {
    // this.nameSub.subscribe(console.log);
    this.sub = await this.route.params.subscribe(params => {
      this.colorNum = +(params.color);
      this.key = params.key;
    });
    this.course = await this.courseService.getCourseInfo(this.key);
    const res: any = await  this.courseService.getCourseAnnouncements(this.key);
    this.announcements = res.result;
    this.showCommentSection = [];
    this.loadingComments = [];
    this.commentValueSubjects = new Array<Subject<any>>(this.announcements.length);
    this.announcements.forEach((item, i) => {
      this.commentForms.set(item.id, this.formBuilder.group({
        replyID: [item.id],
        replyComment: ['', [Validators.required]],
        replyType: ['announcement']
      }));
      /*private treeControls: Array<NestedTreeControl<NestedComment>>;
    private dataSources: Array<MatTreeNestedDataSource<NestedComment>>;*/
      this.treeControls.push(new NestedTreeControl<NestedComment>(node => node.replyComments));
      this.dataSources.push(new MatTreeNestedDataSource<NestedComment>());
      this.showCommentSection.push(false);
      this.loadingComments.push(false);
      // console.log(i);
      this.commentValueSubjects[i] = new BehaviorSubject(null);
      item.realDate = new Date(item.dateMadeOn);
    });
    console.log(this.commentForms);
    this.announcements.sort((dt1, dt2) => {
      dt1 = dt1.realDate;
      dt2 = dt2.realDate;
      return dt2 - dt1;
    });
    for (const a of this.commentValueSubjects) {
     // a.subscribe(console.log);
    }

  }
  // tslint:disable-next-line:variable-name
 async submitReply(id: number, accId: number) {
    const formValue = this.replyForms.get(id).value;
    console.log(formValue);
    const commentResult =  await this.courseService.makeComment(formValue);
    console.log(commentResult);
    this.showComments(accId);
    // this.showComments(accId);
  }
  viewcommentReply(i: number) {
    this.showCommentSectionReply[i] = !(this.showCommentSectionReply[i]);
  }
   async submitComment(id: number, accId: number) {
    console.log(id);
    const formValue = this.commentForms.get(id).value;
    console.log(formValue);
    const commentResult =  await this.courseService.makeComment(formValue);
    console.log(commentResult);
    this.showComments(accId);
  }
}
