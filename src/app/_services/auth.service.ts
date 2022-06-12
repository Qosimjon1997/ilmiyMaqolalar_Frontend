import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ManagersDto } from '../models/managers-dto';


const AUTH_API = environment.baseUrl + 'api/Authenticate/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, password: string, fio: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
      password,
      fio
    }, httpOptions);
  }

  resetPassword(username:string, newPassword:string): Observable<any> {
    return this.http.post(AUTH_API + 'resetpassword', {
      username,
      newPassword
    }, httpOptions);
  }

  getAllManagers(): Observable<ManagersDto[]> {  
    return this.http.get<ManagersDto[]>(AUTH_API + 'getallemployeeforadmin')  
      .pipe(  
        catchError(this.handleError)  
      );  
  } 

  private handleError(err: { error: { message: any; }; status: any; body: { error: any; }; }) {  
    let errorMessage: string;  
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;  
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
    }  
    console.error(err);  
    return throwError(errorMessage);  
  }

  registerManager(username: string, password: string, fio: string): Observable<any> {
    return this.http.post(AUTH_API + 'registermanager', {
      username,
      password,
      fio
    }, httpOptions);
  }





}

