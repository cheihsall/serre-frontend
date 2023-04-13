import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint: any;
  httpClient: any;
  constructor(private http: HttpClient, private route: Router) {}
//modification password user
  updatePassword(id: any, data: any): Observable<any> {
    console.log(id);

    console.log(data);

    let API_URL = `${this.endpoint}/updateUser/${id}`;

    return this.http.patch(`http://localhost:3000/endpoint/updateUser/${id}`, {"actuelPass": data.actuelPass,
  "newPass":data.newPass})
  }

}
