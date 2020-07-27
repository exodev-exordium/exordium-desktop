import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Handler
import { SituationHandler } from './../helpers/situation.handler';

// Models and Vars
import { User } from './../model/User';
import { API } from './../vars/Api';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint = new API().endpoint;
  private headers = new API().headers;

  constructor(
    private http: HttpClient,
    private router: Router,
    private handler: SituationHandler
  ) { }

  // Register Account
  register(user: User): Observable<any> {
    const api = `${this.endpoint}/auth/register`;

    return this.http.post (api, user).pipe(
      catchError(this.handler.handleError)
    );
  }

  // Sign in
  signin(user: User): Observable<any> {
    const api = `${this.endpoint}/auth/signin`;

    return this.http.post (api, user).pipe(
      catchError(this.handler.handleError)
    );
  }

  // Sign out
  signout() {
      const removeToken = localStorage.removeItem('access_token');
      if (removeToken == null) {
        this.router.navigate(['auth/signin']);
      }
  }

  // Get User Token
  getToken() {
      return localStorage.getItem('access_token');
  }

  // Are we logged in?
  get isSignedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

}