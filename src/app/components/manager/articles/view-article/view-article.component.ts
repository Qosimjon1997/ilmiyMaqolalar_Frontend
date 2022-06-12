import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ArticleDto } from 'src/app/models/article-dto';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/models/progress-status';
import { ArticleServiceService } from 'src/app/_services/article-service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AddArticleComponent } from '../add-article/add-article.component';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {

  allArticles : ArticleDto[] = [];
  constructor(private articleService : ArticleServiceService, private snackBar : MatSnackBar, public dialog: MatDialog, private tokenStorageService: TokenStorageService, private router : Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorageService.getUser().roleName);
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['/login'])
    }
    else if(this.tokenStorageService.getUser().roleName=='Admin'){
      this.router.navigate(['/staff/admin/manager/index'])
    }
    

    this.readData();
  }

  readData(){
    this.articleService.getAllArticles().subscribe(
      alldata => {
        this.allArticles = alldata;
      },
      error => console.log(error)
    );
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration : 3000
    });
  }

  btnDelete(id : string) : void{
    this.articleService.deleteData(id).subscribe(
      emp => {
        this.readData();
        this.openSnackBar('Article successfully deleted!');
      },
      error => {
        console.log(error);
      }
    )
  }

  public fileInDownload!: string ;
  public percentage!: number;
  public showProgress!: boolean;
  public showDownloadError!: boolean;
  public showUploadError!: boolean;

  public downloadStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showDownloadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        //this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showDownloadError = true;
        break;
    }
  }

  btnOpenDialogForAddArticle() : void{
    const dialogRef = this.dialog.open(AddArticleComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.readData();
    });
  }

}
