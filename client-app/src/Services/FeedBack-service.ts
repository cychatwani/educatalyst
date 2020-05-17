import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './User-service';


@Injectable({
  providedIn: 'root'
})
export class FeedBackService {
  constructor(private http: HttpClient, private userService: UserService) {
  }
  async getFeedBacks(id: number) {
    const url  = 'http://localhost:1236/faculty/getLectureFeedBacks?id=' + id;
    const res: any = await this.http.get(url,
      {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    ).toPromise();
    return res.result;
  }
  async getLectures(key: string) {
    const url  = 'http://localhost:1236/getCourseLectures?key=' + key;
    const res: any = await this.http.get(url,
      {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    ).toPromise();
    return res.result;
  }
  async postFeedBack(feedBack: any) {
    const url  = 'http://localhost:1236/student/registerFeedBack';
    const res: any = await this.http.post(url, feedBack,
      {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    ).toPromise();
    return res.result;
  }
}
