import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticleClass, ArticleDto } from 'src/app/models/article-dto';
import { ArticleServiceService } from 'src/app/_services/article-service.service';
import { OpenArticleComponent } from '../open-article/open-article.component';

@Component({
  selector: 'app-view-guest-article',
  templateUrl: './view-guest-article.component.html',
  styleUrls: ['./view-guest-article.component.css']
})
export class ViewGuestArticleComponent implements OnInit {

  constructor(private articleServise: ArticleServiceService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.readUsers();
  }

  allArticle: ArticleDto[] = [];

  readUsers(): void {
    this.articleServise.getAllArticles().subscribe(
      article => {

        this.myFunc(article);

      },
      error => {
        console.log(error);
      }
    )
  }

  myFunc(dataDist: ArticleDto[]) {
    for (let i = 0; i < dataDist.length; i++) {
      let item: ArticleClass = new ArticleClass();
      item.id = dataDist[i].id;
      item.topic = dataDist[i].topic;
      item.authorId = dataDist[i].authorId;
      item.authorFirstname = dataDist[i].authorFirstname;
      item.authorSecondname = dataDist[i].authorSecondname;
      item.fileName = dataDist[i].fileName;
      item.curriculumId = dataDist[i].curriculumId;
      item.curriculumName = dataDist[i].curriculumName;
      item.publishedTime = dataDist[i].publishedTime;
      item.anotation = dataDist[i].anotation;
      item.photoPath = this.myPhotoPath(dataDist[i].photoPath);

      this.allArticle.push(item);
    }
  }

  openArticle(articleId: string) {
    this.router.navigate(['guest/openarticle/' + articleId])
  }

  path: string = '\\assets\\';
  fullPath: string[] = [];
  myPhotoPath(path: string): string {
    this.fullPath = [];
    this.path = "";
    this.fullPath = path.split("\\");
    this.path += '\\assets\\';
    this.path += this.fullPath[this.fullPath.length - 1];
    return this.path;
  }

}
