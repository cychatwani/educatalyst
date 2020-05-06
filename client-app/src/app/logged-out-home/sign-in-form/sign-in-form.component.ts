import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../Services/User-service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {
  myForm: FormGroup;
  private userName: string;
  private password: string;
  private User: any;
  private loading: boolean;
  // tslint:disable-next-line:variable-name
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private _snackBar: MatSnackBar) { }
  onGoingHome() {
    this.router.navigate(['/']);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['error-SnackBar']
    });
  }
  onRequestSignUp() {
    this.router.navigate(['signup']);
  }
  async onRequestSignIn() {
    this.loading = true;
    this.userName = this.myForm.get('email').value;
    this.password = this.myForm.get('password').value;
    // tslint:disable-next-line:no-shadowed-variable
    const role = await this.userService.login(this.userName, this.password).catch((error) => {
      this.myForm.get('email').setValue('');
      this.myForm.get('password').setValue('');
      this.openSnackBar('Bad-Credentials:', 'Incorrect username or password');
      return;
    });
    if (role === 'student') {
       await this.router.navigate(['student/dashboard']);
  } else if (role === 'faculty') {
      await this.router.navigate(['faculty/dashboard']);
    }
  }
    ngOnInit() {
      this.myForm = this.fb.group({
        email: '',
        password: '',
        rememberMe: false,
      });
    }
  }

