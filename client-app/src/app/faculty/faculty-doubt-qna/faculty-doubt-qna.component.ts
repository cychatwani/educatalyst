import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../../../Services/Course-service';
import {DoubtQNAService} from '../../../Services/Doubt-QNA-Service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

interface NestedComment {
  id: number;
  comment: string;
  commenter: object;
  level: number;
  replyComments: Array<NestedComment>;
}

@Component({
  selector: 'app-faculty-doubt-qna',
  templateUrl: './faculty-doubt-qna.component.html',
  styleUrls: ['./faculty-doubt-qna.component.css']
})
export class FacultyDoubtQnaComponent implements OnInit {
  private AnswerFroms = new Map<number, FormGroup>();
  private imagePaths = new Map<number, string>();
  private CourseKey: string;
  private CourseInfo: any;
  private colorNum: number;
  private QuestionList: any;
  private QuestionIDList =  new Array<number>();
  private AnsweredQuestions = new Array<any>();
  private UnanswredQuestions = new Array<any>();
  private imageUploaded = new Map<number, boolean>();
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
          this.imageUploaded.set(this.QuestionList[i].id, false);
          this.AnswerFroms.set ( this.QuestionList[i].id , this.formBuilder.group({
            question_id: [this.QuestionList[i].id],
            answer: ['', [Validators.required]],
          }));
          this.QuestionList[i].viewAnswerFrom = false;
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
    console.log(this.AnswerFroms);
  }

  async onUploadClicked($event: FileList, id: number) {
    console.log(id);
    // console.log(this.AnswerFroms);
    const FileArray = Array.from($event);
    // console.log(FileArray);
    const formData = new FormData();
    formData.append('image', FileArray[0]);
    const path = await this.doubtQnaService.uploadImage(formData);
    this.imagePaths.set(id, path);
    // console.log(this.imagePaths);
    this.imageUploaded.set(id, true);
  }

  onSelectedFilesChanged($event: FileList) {
  }

  async uploadAnswer(id: number) {
    const answerDto = {
      questionId: null,
      answer: '',
      image_url: ''
    };
    if (this.imagePaths.has(id)) {
      answerDto.image_url = this.imagePaths.get(id);
    }
    const fromValue = this.AnswerFroms.get(id).value;
    answerDto.answer = fromValue.answer;
    answerDto.questionId = id;
    const res = await this.doubtQnaService.answer(answerDto);
    window.location.reload();
  }
}
