import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorDto } from '../models/author-dto';


const AUTH_API = environment.baseUrl + 'api/Author/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthorServiceService {

  constructor(private http: HttpClient) { }

  getAllAuthors(): Observable<AuthorDto[]> {  
    return this.http.get<AuthorDto[]>(AUTH_API + 'GetAllAuthors')  
      .pipe(  
        catchError(this.handleError)  
      );  
  }

  getByIdAuthor(id : string) : Observable<AuthorDto>{
    return this.http.get<AuthorDto>(AUTH_API + id)  
      .pipe(  
        catchError(this.handleError)  
      );
  }

  getCountArticlesOfAuthor(id : string) : Observable<number>{
    return this.http.get<number>(AUTH_API + 'CountOfArticle?id=' + id)  
      .pipe(  
        catchError(this.handleError)  
      );
  }

  addAuthor(firstname: string, secondname: string, email: string, phone: string, passport: string, degree: string): Observable<any> {
    return this.http.post(AUTH_API + 'CreateAuthor', {
      firstname,
      secondname,
      email,
      phone,
      passport,
      degree
    }, httpOptions);
  }

  deleteData(id : string): Observable<any> {
    return this.http.delete(AUTH_API + id)  
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
}
