import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorServiceService } from 'src/app/_services/author-service.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  constructor(private authorService: AuthorServiceService, private snackBar : MatSnackBar, public dialogRef: MatDialogRef<AddAuthorComponent>) { }


  ngOnInit(): void {
  }
  form_firstname = new FormControl('', [Validators.required]);
  form_secondname = new FormControl('', [Validators.required]);
  form_email = new FormControl('', [Validators.required]);
  form_phone = new FormControl('', [Validators.required]);
  form_passport = new FormControl('', [Validators.required]);
  
  hide = true;

  degrees : string[] = [
    "Bacholor degree",
    "Master degree",
    "Ph.D.",
    "Doctor of Sciense"
  ]

  selectedValue : string = "Bacholor degree";

  clickSubmit()
  {
      this.authorService.addAuthor(this.form_firstname.value, this.form_secondname.value, this.form_email.value, this.form_phone.value, this.form_passport.value, this.selectedValue).subscribe({
        next : data =>{
          this.openSnackBar('Author successfully created!');
          this.dialogRef.close();
        },
        error : err =>{
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

  getErrorMessage()
  {
    if (this.form_firstname.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.form_secondname.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.form_email.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.form_phone.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.form_passport.hasError('required')) {
      return 'You must enter a value';
    }

    return ' ';
  }
}
