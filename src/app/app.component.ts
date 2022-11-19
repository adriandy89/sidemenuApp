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
    { title: 'Customers', url: '/customers', icon: 'people' },
  ];

  userIsNotAuthenticated$!: Observable<boolean>

  constructor(private readonly _authService: AuthService, private router: Router) {
    this.userIsNotAuthenticated$ = this._authService.userIsNotAuthenticated
  }

  logout() {
    this._authService.logout();
    this.router.navigate(['/login'])
  }
}
