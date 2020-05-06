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
  async uploadImage(formData: any) {
    const result: any = await this.http.post('http://localhost:3000/api/upload/questionImages', formData).toPromise();
    return result.path;
  }
  async askQuestion(questionObject: any){
    const responce = await this.http.post('http://localhost:1236/student/askQuestion',
      questionObject,{
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    ).toPromise();
    return responce;
  }
}
