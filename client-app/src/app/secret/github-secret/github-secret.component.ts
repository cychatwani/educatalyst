import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-github-secret',
  templateUrl: './github-secret.component.html'
})
export class GithubSecretComponent implements OnInit {
  private token: string;
  private sub: any;
  private userInfo: any;
  private role: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(async params => {
      this.token = params.token;
      this.role = params.role;
      const res: any = await this.http.get('http://localhost:1236/userinfo', {
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.token
        })
      }).toPromise();
      localStorage.setItem('currentUserToken', this.token);
      localStorage.setItem('currentUserInformation', JSON.stringify(res.result));
      if (this.role === 'student') {
         this.router.navigate(['student/dashboard']);
      } else if (this.role === 'faculty') {
         this.router.navigate(['faculty/dashboard']);
      }
      }
    );

  }

}
