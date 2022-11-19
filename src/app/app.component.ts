import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
  ];

  userIsNotAuthenticated$!: Observable<boolean>
  userName$!: Observable<string>

  constructor(private readonly _authService: AuthService, private router: Router) {
    this.userIsNotAuthenticated$ = this._authService.userIsNotAuthenticated
    this.userName$ = this._authService.userName
  }

  logout() {
    this._authService.logout();
    this.router.navigate(['/login'])
  }
}
