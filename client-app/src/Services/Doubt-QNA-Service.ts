import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {Users} from '../Models/Users';
import {map} from 'rxjs/operators';
import {UserService} from './User-service';



@Injectable({
  providedIn: 'root'
})
export class DoubtQNAService {
  constructor(private http: HttpClient, private userService: UserService) {
  }
  async getAnswers(id: number) {
    const url = 'http://localhost:1236/QuestionAnswers?id=' + id;
    const res: any = await this.http.get(url,
      {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    ).toPromise();
    return res.result;
  }
  async getComments(id: number){
    const commentUrl = 'http://localhost:1236/AnswerComments?id=' + id;
    const res: any
      =  await this.http.get(commentUrl,
      {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    ).toPromise();
    return res.result;
  }
  async getQuestions(courseKey: string) {
    const url = 'http://localhost:1236/courseQuestions?key=' + courseKey;
    const res: any
      =  await this.http.get(url,
      {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    ).toPromise();
    return res.result;
  }
  async uploadImage(formData: any) {
    const result: any = await this.http.post('http://localhost:3000/api/upload/questionImages', formData).toPromise();
    return result.path;
  }
  async askQuestion(questionObject: any) {
    const responce = await this.http.post('http://localhost:1236/student/askQuestion',
      questionObject, {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    ).toPromise();
    return responce;
  }
  async answer(questionObject: any) {
    const responce = await this.http.post('http://localhost:1236/faculty/answerQuestion',
      questionObject, {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    ).toPromise();
    return responce;
  }
}
