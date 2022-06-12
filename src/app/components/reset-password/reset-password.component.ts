import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: any = {
    password: null,
    confirmpassword: null
  };
  errorMessage = '';

  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>, private authService: AuthService, private tokenStorage: TokenStorageService, private router : Router, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/login'])
    }
  }

  onSubmit(): void {
    const { password, confirmpassword } = this.form;
    if(password == confirmpassword){
      this.authService.resetPassword(this.tokenStorage.getUser().username, password).subscribe({
        next: data => {
          //next
          this.openSnackBar('New password saved succesfully!');
          this.dialogRef.close();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.openSnackBar('Error!');
        }
      });
    }
    else{
      this.openSnackBar('Password do not match!');
    }
    
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  

}
