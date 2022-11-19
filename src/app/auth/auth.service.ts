import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface FakeData {
  fakeAuth:     FakeAuth;
  fakeUserData: FakeUserData;
}

export interface FakeAuth {
  email:    string;
  password: string;
}

export interface FakeUserData {
  token: string;
  name:  string;
  email: string;
  role:  string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new BehaviorSubject<FakeUserData | null>(null);

  constructor(private http: HttpClient) {
    this.fakeRefresh()
  }

  get userIsAuthenticated() {
    return this.user$.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userIsNotAuthenticated() {
    return this.user$.asObservable().pipe(
      map(user => {
        if (user) {
          return !user.token;
        } else {
          return true;
        }
      })
    );
  }

  get userId() {
    return this.user$.asObservable().pipe(
      map(user => {
        if (user) {
          return user;
        } else {
          return null;
        }
      })
    );
  }

  get userName() {
    return this.user$.asObservable().pipe(
      map(user => {
        return user!==null ? user.name : '';
      })
    );
  }

  login(email: string, password: string): Observable<FakeUserData> {
    return this.http
      .get<FakeData>('./../../assets/http/login.json')
      .pipe(
        delay(1200),
        map((fakeData: FakeData) => {
        if (email === fakeData.fakeAuth.email && password === fakeData.fakeAuth.password){
          this.user$.next(fakeData.fakeUserData)
          localStorage.setItem('USER_DATA', JSON.stringify(fakeData.fakeUserData))
          return fakeData.fakeUserData;
        } else {
          throw new HttpErrorResponse({
            error: 'BAD_REQUEST',
            status: 404,
            statusText: 'Invalid email or password!',
          })
        }
      }));
  }

  fakeRefresh(){
    const userData = localStorage.getItem('USER_DATA')!==null ? JSON.parse(localStorage.getItem('USER_DATA')!) : null;
    this.user$.next(userData)
    console.log(userData);
  }

  logout() {
    this.user$.next(null);
  }

}
