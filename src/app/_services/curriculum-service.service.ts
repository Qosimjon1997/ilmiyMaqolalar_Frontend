import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurriculumDto } from '../models/curriculum-dto';


const AUTH_API = environment.baseUrl + 'api/Curriculum/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CurriculumServiceService {

  constructor(private http: HttpClient) { }

  getAllCurriculums(): Observable<CurriculumDto[]> {  
    return this.http.get<CurriculumDto[]>(AUTH_API + 'GetAllCurriculums')  
      .pipe(  
        catchError(this.handleError)  
      );  
  }

  getByIdCurriculum(id : string) : Observable<CurriculumDto>{
    return this.http.get<CurriculumDto>(AUTH_API + id)  
      .pipe(  
        catchError(this.handleError)  
      );
  }

  addCurriculum(name: string): Observable<any> {
    return this.http.post(AUTH_API + 'CreateCurriculum', {
      name
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
