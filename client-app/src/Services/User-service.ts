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
  createOauthWindow(url: string, name = 'Authorization', width = 500, height = 600, left = 500, top = 0) {
    if (url == null) {
      return null;
    }
    const options = `width=${width},height=${height},left=${left},top=${top}`;
    return window.open(url, name, options);
  }
   googleLogin() {
     const windowHandel = this.createOauthWindow('https://accounts.google.com/o/oauth2/auth?' +
       'client_id=730867517729-ia2lv1efml0fekjogp2ku93ujll4tpfg.apps.googleusercontent.com&' +
       'response_type=code&' +
       'redirect_uri=http://localhost:3000/api/auth/google&' +
       'scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile' +
       '&access_type=offline',
       'Auth');
   }

  githubLogin() {
    const windowHandel = this.createOauthWindow('https://github.com/login/oauth/authorize?scope=user:email&client_id=2dea4cc131cbde4d7085');
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
