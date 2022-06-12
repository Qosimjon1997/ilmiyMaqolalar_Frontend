import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleDto } from '../models/article-dto';

const AUTH_API = environment.baseUrl + 'api/Article/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<ArticleDto[]> {  
    return this.http.get<ArticleDto[]>(AUTH_API + 'GetAllArticles')  
      .pipe(  
        catchError(this.handleError)  
      );  
  }

  getAllArticlesByAuthorId(id : string): Observable<ArticleDto[]> {  
    return this.http.get<ArticleDto[]>(AUTH_API + 'GetAllArticlesByAuthorId?id='+id)  
      .pipe(  
        catchError(this.handleError)  
      );  
  }

  getAllArticlesByCurriculumId(id : string): Observable<ArticleDto[]> {  
    return this.http.get<ArticleDto[]>(AUTH_API + 'GetAllArticlesByCurriculumId?id='+id)  
      .pipe(  
        catchError(this.handleError)  
      );  
  }

  getByIdArticle(id : string) : Observable<ArticleDto>{
    return this.http.get<ArticleDto>(AUTH_API + id)  
      .pipe(  
        catchError(this.handleError)  
      );
  }

  addArticle(topic:string, authorId:string, fileName:string, photopath:string, anotation:string, curriculumId:string): Observable<any> {
    return this.http.post(AUTH_API + 'CreateArticle', {
      topic,
      authorId,
      fileName,
      photopath,
      anotation,
      curriculumId
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
