import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/data/models/app-user';
import { IUserUpdate } from 'src/app/data/models/app-user-update';

@Injectable({
  providedIn: 'root'
})
export class LogUpService {

  constructor(private http: HttpClient) { }

  logup(newUser: IUserUpdate): Observable<IUser> {
    return this.http.post<IUser>('/api/users', newUser);
  }

  checkAvailableUsername(username: string): Observable<boolean> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<boolean>('/api/account/checkavailableusername', JSON.stringify(username), {headers: headers});
  }

  checkAvailableEmail(email: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<boolean>('api/account/checkavailableemail', JSON.stringify(email), {headers: headers});
  }
}
