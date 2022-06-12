import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CurriculumDto } from 'src/app/models/curriculum-dto';
import { CurriculumServiceService } from 'src/app/_services/curriculum-service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AddCurriculumComponent } from '../add-curriculum/add-curriculum.component';

@Component({
  selector: 'app-view-curriculum',
  templateUrl: './view-curriculum.component.html',
  styleUrls: ['./view-curriculum.component.css']
})
export class ViewCurriculumComponent implements OnInit {

  allCurriculums : CurriculumDto[] = [];
  constructor(private curriculumService : CurriculumServiceService, private snackBar : MatSnackBar, public dialog: MatDialog, private tokenStorageService: TokenStorageService, private router : Router) { }

  ngOnInit(): void {
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['/login'])
    }
    else if(this.tokenStorageService.getUser().roleName=='Admin'){
      this.router.navigate(['/staff/admin/manager/index'])
    }

    this.readData()
  }

  readData(){
    this.curriculumService.getAllCurriculums().subscribe(
      alldata => {
        this.allCurriculums = alldata;
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
    this.curriculumService.deleteData(id).subscribe(
      emp => {
        this.readData();
        this.openSnackBar('Curriculum successfully deleted!');
      },
      error => {
        console.log(error);
      }
    )
  }

  btnOpenDialogForAddCurriculum() : void{
    const dialogRef = this.dialog.open(AddCurriculumComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.readData();
    });
  }


}
