import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorDto } from 'src/app/models/author-dto';
import { AuthorServiceService } from 'src/app/_services/author-service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AddAuthorComponent } from '../add-author/add-author.component';

@Component({
  selector: 'app-view-author',
  templateUrl: './view-author.component.html',
  styleUrls: ['./view-author.component.css']
})
export class ViewAuthorComponent implements OnInit {

  allAuthors : AuthorDto[] = [];
  constructor(private authorService : AuthorServiceService, private snackBar : MatSnackBar, public dialog: MatDialog, private tokenStorageService: TokenStorageService, private router : Router) { }

  ngOnInit(): void {
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['/login'])
    }
    else if(this.tokenStorageService.getUser().roleName=='Admin'){
      this.router.navigate(['/staff/admin/manager/index'])
    }

    this.readData();
  }

  readData(){
    this.authorService.getAllAuthors().subscribe(
      alldata => {
        this.allAuthors = alldata;
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
    this.authorService.deleteData(id).subscribe(
      emp => {
        this.readData();
        this.openSnackBar('Author successfully deleted!');
      },
      error => {
        console.log(error);
      }
    )
  }

  btnOpenDialogForAddAuthor() : void{
    const dialogRef = this.dialog.open(AddAuthorComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.readData();
    });
  }

}
