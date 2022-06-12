import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleClass, ArticleDto } from 'src/app/models/article-dto';
import { AuthorDto } from 'src/app/models/author-dto';
import { ArticleServiceService } from 'src/app/_services/article-service.service';
import { AuthorServiceService } from 'src/app/_services/author-service.service';

@Component({
  selector: 'app-view-about-author',
  templateUrl: './view-about-author.component.html',
  styleUrls: ['./view-about-author.component.css']
})
export class ViewAboutAuthorComponent implements OnInit {

  constructor(private authorService: AuthorServiceService, private route: ActivatedRoute, private articleServise: ArticleServiceService, private router: Router) { }

  id: string | null | undefined;
  selectedAuthor !: AuthorDto;
  allArticle: ArticleDto[] = [];
  countOfArticle: number = 0;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.authorService.getByIdAuthor(this.id).subscribe(
        data => {
          if (data != undefined) {
            this.selectedAuthor = data;
            this.readUsers(data.id);
          }
        },
        error => {
          console.log(error);
        }
      )

    }

  }

  readUsers(id: string): void {
    this.articleServise.getAllArticlesByAuthorId(id).subscribe(
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

  openArticle(articleId: string) {
    this.router.navigate(['guest/openarticle/' + articleId])
  }

}
