import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {kebabToCamelCase} from 'codelyzer/util/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CompileReflector} from '@angular/compiler';
import {DoubtQNAService} from '../../../../Services/Doubt-QNA-Service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {
  imageUploaded: boolean;
  imagePath: string;
  courseKey: string;
  imageUploading: boolean;
  CourseKey: string;
  formGroup: FormGroup;
  panelOpenState = false;
  togglePanel() {
    this.panelOpenState = !this.panelOpenState
  }
  // tslint:disable-next-line:max-line-length
  constructor(private doubtQnaService: DoubtQNAService, private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder) { }
  ngOnInit() {
    // setTimeout(() => {
    //   this.togglePanel();
    // }, 500);
    this.CourseKey = this.route.snapshot.params.key;
    // console.log(this.route.snapshot.params.key);
    this.imagePath = '';
    this.imageUploading = false;
    this.imageUploaded = false;
    this.formGroup = this.formBuilder.group({
      question: ['', [Validators.required]],
    });
  }
  async onRequestAsk() {
    this.togglePanel();
    const questionObject = {
      question: this.formGroup.value.question,
      courseKey: this.CourseKey,
      imageUrl: this.imagePath
    };
    console.log(questionObject);
    const responce =  await this.doubtQnaService.askQuestion(questionObject);
    console.log(responce);
    this.formGroup.get('question').setValue('');
  }

  async onUploadClicked($event: FileList) {
    this.imageUploading = true;
    const FileArray = Array.from($event);
    console.log(FileArray);
    const formData = new FormData();
    formData.append('image', FileArray[0]);
    // const result: any = await ;
    this.imagePath = await this.doubtQnaService.uploadImage(formData) ;
    console.log(this.imagePath);
    this.imageUploaded = true;
    this.imageUploading = false;
  }
}
