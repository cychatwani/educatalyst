import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/User-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onRequestLogOut() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
