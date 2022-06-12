import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurriculumServiceService } from 'src/app/_services/curriculum-service.service';

@Component({
  selector: 'app-add-curriculum',
  templateUrl: './add-curriculum.component.html',
  styleUrls: ['./add-curriculum.component.css']
})
export class AddCurriculumComponent implements OnInit {


  constructor(private curriculumService: CurriculumServiceService, private snackBar : MatSnackBar, public dialogRef: MatDialogRef<AddCurriculumComponent>) { }

  form_name = new FormControl('', [Validators.required]);

  hide = true;

  ngOnInit(): void {
  }

  clickSubmit(){
    this.curriculumService.addCurriculum(this.form_name.value).subscribe({
      next : data =>{
        this.openSnackBar('Curriculum successfully created!');
        this.dialogRef.close();
      },
      error : err =>{
        console.log(3);
        console.log(err);
      }
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration : 3000
    });
  }

  btnDisabled : boolean = true;

  check(event : any):void{
    if(event.target.value.length > 0){
      this.btnDisabled = false;
    }
    else{
      this.btnDisabled = true;
    }
  }

  getErrorMessage(){
    if (this.form_name.hasError('required')) {
      return 'You must enter a value';
    }

    return ' ';
  }
}
