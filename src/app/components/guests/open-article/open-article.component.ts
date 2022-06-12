import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDto } from 'src/app/models/article-dto';
import { ArticleServiceService } from 'src/app/_services/article-service.service';

@Component({
  selector: 'app-open-article',
  templateUrl: './open-article.component.html',
  styleUrls: ['./open-article.component.css']
})
export class OpenArticleComponent implements OnInit {

  myFilePath : string = '\\assets\\';
  fullPath : string[] = [];
  constructor(private route: ActivatedRoute, private articleService: ArticleServiceService) { }

  id:string | null | undefined;
  allArticle? : ArticleDto;


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != null)
    {
      this.articleService.getByIdArticle(this.id).subscribe(
        article => {
          this.allArticle = article;
          this.fullPath = article.fileName.split("\\");
          this.myFilePath += this.fullPath[this.fullPath.length-1];
        },
        error => {
          console.log(error);
        }
      )
    }

    
  }


}
