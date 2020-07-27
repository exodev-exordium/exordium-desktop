import { HttpHeaders } from '@angular/common/http';

export class API {
    public endpoint = 'https://api.exordium.org';
    //public endpoint = 'http://127.0.0.1:80';
    public headers = new HttpHeaders().set('Content-Type', 'application/json');
}