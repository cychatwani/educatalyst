import { Component, OnInit } from '@angular/core';
import {DoubtQNAService} from '../../../../Services/Doubt-QNA-Service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CourseService} from '../../../../Services/Course-service';
import {Subject} from 'rxjs';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';

interface NestedComment {
  id: number;
  comment: string;
  commenter: object;
  level: number;
  replyComments: Array<NestedComment>;
}

@Component({
  selector: 'app-display-question',
  templateUrl: './display-question.component.html',
  styleUrls: ['./display-question.component.css']
})
export class DisplayQuestionComponent implements OnInit {
  private CourseKey: string;
  private CourseInfo: any;
  private colorNum: number;
  private QuestionList: any;
  private QuestionIDList =  new Array<number>();
  private AnsweredQuestions = new Array<any>();
  private UnanswredQuestions = new Array<any>();


  private loadingComments: Array<boolean>;
  private commentValueSubjects: Array<Subject<any>>;
  private treeControls = new  Array<NestedTreeControl<NestedComment>>();
  private dataSources = new Map<number, MatTreeNestedDataSource<NestedComment>>();
  private replyForms = new Map<number, FormGroup>();
  private commentForms =  new Map<number, FormGroup>();




  hasChild = (_: number, node: NestedComment) => !!node.replyComments && node.replyComments.length > 0;

  // tslint:disable-next-line:max-line-length
  constructor(private courseService: CourseService, private doubtQnaService: DoubtQNAService, private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder) { }
  async ngOnInit() {
    this.CourseKey = this.route.snapshot.params.key;
    this.CourseInfo =  await this.courseService.getCourseInfo(this.CourseKey);
    console.log();
    this.colorNum = +(this.route.snapshot.params.color);
    this.QuestionList = await this.doubtQnaService.getQuestions(this.CourseKey);
    let i =  -1;
    for (const question of this.QuestionList) {
      const realDate = new Date(question.dateAskedOn);
      question.realDate = realDate;
      i++;
      const id: number = +(question.id);
      if (this.QuestionIDList.indexOf(id) === -1) {
        this.QuestionIDList.push(id);
        const answers = new Array<any>();
        const results = await this.doubtQnaService.getAnswers(id);
        for (const result of results) {
          const commentId: number = +(result.id);
          const comments = await this.doubtQnaService.getComments(commentId);
          const CommentList = new Array<any>();
          for (const comment of comments) {
            CommentList.push(comment);
          }
          const AnswerRealDate = new Date(result.dateAnsweredOn);
          result.realDate = AnswerRealDate;
          result.comments = CommentList;
          result.viewComments = false;
          answers.push(result);
        }
        if (answers.length === 0) {
          this.UnanswredQuestions.push(this.QuestionList[i]);
        } else {
          this.AnsweredQuestions.push(this.QuestionList[i]);
        }
        this.QuestionList[i].answers = answers;
      }
    }
    const viewAnswers = new Array<boolean>();
    // tslint:disable-next-line:prefer-for-of
    for (const question of this.AnsweredQuestions) {
      question.viewAnswer = false;
    }
    console.log(this.UnanswredQuestions);
    console.log(this.AnsweredQuestions);

  }

}
