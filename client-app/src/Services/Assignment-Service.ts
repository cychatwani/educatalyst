import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './User-service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  constructor(private http: HttpClient, private userService: UserService) {
  }
  async uploadFile(formData: any) {
    const result: any = await this.http.post('http://localhost:3000/api/upload/AssignmentFiles', formData).toPromise();
    return result.path;
  }
  async PostAssignment(submitRequest: any) {{
    const url = 'http://localhost:1236/faculty/postAssignment';
    const res: any = await this.http.post(url, submitRequest,
      {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    ).toPromise();
    return res.result;
  }

  }
  async submitAssignment(submitRequest: any) {
    const url = 'http://localhost:1236/student/submitAssignment';
    const res: any = await this.http.post(url, submitRequest,
      {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    ).toPromise();
    return res.result;
  }
  async getCourseAssignment(key: string) {
    const url = 'http://localhost:1236/courseAssignments?key=' + key;
    const res: any = await this.http.get(url,
      {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userService.currentUsertoken
        })
      }
    ).toPromise();
    return res.result;
  }
}

