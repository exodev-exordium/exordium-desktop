import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Handler
import { SituationHandler } from './../helpers/situation.handler';

// Models and Vars
import { API } from './../vars/Api';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = new API().endpoint;
  private headers = new API().headers;

  constructor(
    private http: HttpClient,
    private router: Router,
    private handler: SituationHandler
  ) { }

  // Basic User Data
  getUserDataBasic(): Observable<any> {
    const api = `${this.endpoint}/user/me/basic`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map(
        (res: Response) => {
          return res || {};
        }
      ),
      catchError(this.handler.handleError)
    );
  }

  // Advanced User Data
  getUserDataAdvanced(): Observable<any> {
    const api = `${this.endpoint}/user/me/advanced`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map(
        (res: Response) => {
          return res || {};
        }
      ),
      catchError(this.handler.handleError)
    );
  }

  // User Tokens
  getUserTokens(): Observable<any> {
    const api = `${this.endpoint}/user/me/tokens`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map(
        (res: Response) => {
          return res || {};
        }
      ),
      catchError(this.handler.handleError)
    );
  }
  
}