import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './User-service';
// @ts-ignore
import {Course} from '../Models/Course.Ts';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // private userService: string;
  constructor(private http: HttpClient, private userService: UserService) {
  }
  public async getAnnouncemetComments(id: number) {
    const requestUrl = 'http://localhost:1236/AnnouncementComments?accID=' + id;
    return await this.http.get(requestUrl, {
      headers: new HttpHeaders({
        Authorization : 'Bearer ' + this.userService.currentUsertoken
      })
    }).toPromise();
}
  public async getCourseAnnouncements(key: string) {
    const requestUrl = 'http://localhost:1236/courseAllAnnouncements?key=' + key;
    return await this.http.get(requestUrl, {
      headers: new HttpHeaders({
        Authorization : 'Bearer ' + this.userService.currentUsertoken
      })
    }).toPromise();
  }
  public async getFacultyCourses() {

    const courses = await this.http.get('http://localhost:1236/faculty/getcourses', {
      headers: new HttpHeaders({
        Authorization : 'Bearer ' + this.userService.currentUsertoken
      })
    }).toPromise();
    return courses;
  }
  public async getStudentCourses() {
    const courses = await this.http.get('http://localhost:1236/student/getcourses', {
      headers: new HttpHeaders({
        Authorization : 'Bearer ' + this.userService.currentUsertoken
      })
    }).toPromise();
    return courses;
  }
  public  async makeNewCourse(course: Course) {
    const result = this.http.post('http://localhost:1236/faculty/addnewcourse', course, {
      headers: new HttpHeaders({
        Authorization : 'Bearer ' + this.userService.currentUsertoken
      })
    }).toPromise();
    return result;
  }
  public  async makeComment(commentDto: any) {
    const result = this.http.post('http://localhost:1236/makeComment', commentDto, {
      headers: new HttpHeaders({
        Authorization : 'Bearer ' + this.userService.currentUsertoken
      })
    }).toPromise();
    return result;
  }
  public async  getCourseInfo(courseKey: string) {
    let url = 'http://localhost:1236/courseInfo?key=';
    url += courseKey;
    return await this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.currentUsertoken
      })
    }).toPromise();
  }
  public async  enroll(courseId: string) {
    const result = this.http.post('http://localhost:1236/student/enrollcourse', {
        requestKey: courseId
      }, {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    );
    return result;
  }
}

