import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorDto } from 'src/app/models/author-dto';
import { CurriculumDto } from 'src/app/models/curriculum-dto';
import { MyFileName, MyFileName2, ProgressStatus, ProgressStatusEnum } from 'src/app/models/progress-status';
import { ArticleServiceService } from 'src/app/_services/article-service.service';
import { AuthorServiceService } from 'src/app/_services/author-service.service';
import { CurriculumServiceService } from 'src/app/_services/curriculum-service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UploadDownloadService } from 'src/app/_services/upload-download.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  constructor(
    private articleService : ArticleServiceService, 
    private authorService : AuthorServiceService, 
    private curriculumService : CurriculumServiceService, 
    private snackBar : MatSnackBar, 
    public dialogRef: MatDialogRef<AddArticleComponent>,
    private service: UploadDownloadService,
    private tokenStorage : TokenStorageService
    
    ) { }


  ngOnInit(): void {
    this.curriculumService.getAllCurriculums().subscribe(
      alldata => {
        this.allCurriculum = alldata;
        this.selectedValueCurriculumName = alldata[0].id;
      },
      error => console.log(error)
    );
    this.authorService.getAllAuthors().subscribe(
      alldata => {
        this.allAuthor = alldata;
        this.selectedValueCurriculumName = alldata[0].id;
      },
      error => console.log(error)
    );
  }

  allCurriculum : CurriculumDto[] = [];
  allAuthor : AuthorDto[] = [];

  selectedValueCurriculumName : string = '';
  selectedValueAuthorName : string = '';

  form_topic = new FormControl('', [Validators.required]);
  form_anotation = new FormControl('', [Validators.required]);

  hide = true;


  clickSubmit()
  {
      this.articleService.addArticle(this.form_topic.value, this.selectedValueAuthorName, this.filePath2, this.filePathPhoto, this.form_anotation.value, this.selectedValueCurriculumName).subscribe({
        next : data =>{
          console.log(data);
          this.openSnackBar('Article successfully created!');
          this.dialogRef.close();
        },
        error : err =>{
          console.log(err);
        }
      });

      
      console.log("1");
  }

  _toUserId : string = this.tokenStorage.getUser().id;
  _myUser : string = this.tokenStorage.getUser().id;

  public fileInDownload!: string ;
  public percentage!: number;
  public showProgress!: boolean;
  public showProgress2!: boolean;
  public showDownloadError!: boolean;
  public showUploadError!: boolean;
  public showUploadError2!: boolean;

  public myfile1 : string = ''; 
  public myFileName : string = '';

  public myfilephotp2 : string = ''; 
  public myFilephotoName2: string = '';
  
  btnDisabled : boolean = true;

  myfile(event: MyFileName){
    this.myfile1 = event.name;
    this.myFileName = event.myFilename;
  }
  myfile2(event: MyFileName2){
    this.myfilephotp2 = event.name;
    this.myFilephotoName2 = event.myFilename;
  }

  public uploadStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showUploadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        //this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        this.addFileDb();
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showUploadError = true;
        break;
    }
  }

  public uploadStatus2(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showUploadError2 = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress2 = true;
        //this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress2 = false;
        this.addFileDbPhoto();
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress2 = false;
        this.showUploadError2 = true;
        break;
    }
  }

  filePath2 : string = '';
  addFileDb(){
    this.service.getFilePath(this.myFileName).subscribe(
      data=>{
        this.filePath2 = data[0];
        // this.btnDisabled = false;
      }
    );
  }

  filePathPhoto : string = '';
  addFileDbPhoto(){
    this.service.getFilePath(this.myFilephotoName2).subscribe(
      data=>{
        this.filePathPhoto = data[0];
        // this.btnDisabled = false;
      }
    );
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration : 3000
    });
  }

  getErrorMessage()
  {
    if (this.form_topic.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form_anotation.hasError('required')) {
      return 'You must enter a value';
    }

    return ' ';
  }

}
