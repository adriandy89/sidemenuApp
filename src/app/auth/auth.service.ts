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

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<FakeUserData> {
    return this.http
      .get<FakeData>('./../../assets/http/login.json')
      .pipe(
        delay(1200),
        map((fakeData: FakeData) => {
        if (email === fakeData.fakeAuth.email && password === fakeData.fakeAuth.password){
          this.user$.next(fakeData.fakeUserData)
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

  logout() {
    this.user$.next(null);
  }

  // private setUserData(userData: AuthResponseData) {
  //   const expirationTime = new Date(
  //     new Date().getTime() * 1000
  //   );
  //   this.user$.next(
  //     new User(
  //       userData.localId,
  //       userData.email,
  //       userData.idToken,
  //       expirationTime
  //     )
  //   );
  // }
}
