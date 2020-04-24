import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {Users} from '../Models/Users';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUsertoken: string;
  constructor(private http: HttpClient) {
    this.currentUsertoken = localStorage.getItem('currentUserToken');
  }
  public getCurrentUserInfo() {
    const stringUser = localStorage.getItem('currentUserInformation');
    if (stringUser) {
    return JSON.parse(stringUser);
    } else { return null; }
  }
  private async getUserInfo(token: string) {
    const userinfo = await this.http.get('http://localhost:1236/userinfo', {
      headers: new HttpHeaders({
        Authorization : 'Bearer ' + token
      })
    }).toPromise();
    return userinfo;
  }
   register(user: Users) {
     return this.http.post('http://localhost:1236/adduser', user);
   }
   async login(userName, password) {
     let role: string;
     await this.http.post<any>('http://localhost:1236/authenticate', { userName, password })
     .pipe(map(user => {
      const token = user.result.token;
      this.currentUsertoken = token;
      console.log('hello');
      localStorage.setItem('currentUserToken', user.result.token);
      localStorage.setItem('currentUserInformation', JSON.stringify(user.result.user));
      role = user.result.user.user_role;
     })).toPromise();
     return role;
  }

  logout() {
    this.currentUsertoken = null;
    localStorage.removeItem('currentUserToken');
    localStorage.removeItem('currentUserInformation');
  }



}
