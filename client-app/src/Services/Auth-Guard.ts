import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from './User-service';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public JwtHelper: JwtHelperService;
  public userToken: string;
  constructor(
    private router: Router,
    private  authService: UserService,
  ) {
    this.JwtHelper = new JwtHelperService();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.getCurrentUserInfo();
    this.userToken = this.authService.currentUsertoken;
    if (user) {
      const expDate = this.JwtHelper.getTokenExpirationDate(this.userToken);
      console.log(user);
      const current = new Date();
      if (current > expDate) {
        this.authService.logout();
        this.router.navigate(['signin']);
        return false;
      }
      if (route.data.roles && !(route.data.roles.includes(user.user_role))) {
        console.log(user.user_role);
        console.log(route.data);
        this.router.navigate(['signup']);
        return false;
      }
      return true;
    }
    this.router.navigate(['signin']);
    return false;
  }
}
