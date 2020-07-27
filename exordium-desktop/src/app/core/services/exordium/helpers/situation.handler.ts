import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

// rxjs
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SituationHandler {

    constructor() { }

    // ErrorHandler
    handleError(error: HttpErrorResponse) {
        let msg = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message;
        } else {
            // server-side error
            msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        return throwError(msg);
    }

}