import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatSnackBar} from '@angular/material';
import {UserService} from '../../../Services/User-service';
import {Users} from '../../../Models/Users';
import {first} from 'rxjs/operators';


export class ConfirmPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  matcher = new ConfirmPasswordErrorStateMatcher();
  passwordPattern = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,500}$';
  phoneNumberPattern = '^[6789]\\d{9}$';
  userRoles: string[] = ['student', 'faculty'];
  submitted = false;
  loading = false;
   user: Users;
  myForm: FormGroup;



  // tslint:disable-next-line:variable-name
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private _snackBar: MatSnackBar) {
  }
  onSignUpRequest() {
    this.submitted = true;
    if (this.myForm.invalid) { return; }
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.user = new Users(this.myForm.get('name').value, this.myForm.get('email').value, '', 'local', this.myForm.get('phone').value, this.myForm.get('Passwords').get('password').value, this.myForm.get('user_role').value);
    this.userService.register(this.user).pipe(first()).subscribe(
      data => {
        setTimeout(() => {
          this.router.navigate(['signin']);
        }, 3000);
        this.openSnackBar('Successful', 'You are Registered');
      },
      error => {
        this.openSnackBar('Something went wrong', '');
        this.loading = false;
      }
    );
  }
  onGoingHome() {
    this.router.navigate(['/']);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  onGoingBack() {
    this.router.navigate(['signin']);
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      Passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(150), Validators.pattern(this.passwordPattern)]],
        passwordConfirm: ['', [Validators.required]]
      }, { validator: this.checkPasswords }),
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(this.phoneNumberPattern)]],
      user_role: ['', [Validators.required]],
      accountType: 'local',
    });


  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordConfirm.value;
    return pass === confirmPass ? null : {notSame: true};
  }
}
