import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnInit {

  constructor(private authService: AuthService, private snackBar : MatSnackBar, public dialogRef: MatDialogRef<AddManagerComponent>) { }

  ngOnInit(): void {
  }


  form_fio = new FormControl('', [Validators.required]);
  form_username = new FormControl('', [Validators.required]);
  form_passw1 = new FormControl('', [Validators.required]);
  form_passw2 = new FormControl('', [Validators.required]);
  
  hide1 = true;
  hide2 = true;

  clickSubmit():void
  {
    if(this.form_passw1.value == this.form_passw2.value)
    {
      this.authService.registerManager(this.form_username.value, this.form_passw1.value, this.form_fio.value).subscribe({
        next : data =>{
          console.log(data);
          this.openSnackBar('Manager successfully created!');
          this.dialogRef.close();
        },
        error : err =>{
          console.log(err);
        }
      });

    }
    else
    {
      this.openSnackBar('Please enter password again!');
    }
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration : 3000
    });
  }

  btnDisabled : boolean = true;
  checkPassword():void{
    if(this.form_passw1.value != this.form_passw2.value){
      this.btnDisabled = true;
    }
    else{
      this.btnDisabled = false;
    }
  }

  getErrorMessage()
  {
    if (this.form_fio.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.form_username.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.form_passw1.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.form_passw2.hasError('required')) {
      return 'You must enter a value';
    }

    return ' ';
  }

}
