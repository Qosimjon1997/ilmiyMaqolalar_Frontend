import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private snackBar : MatSnackBar, private authService: AuthService, private tokenStorage: TokenStorageService, private router : Router) { }
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roleName;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roleName;

        if(data.roleName == 'Admin'){
          this.router.navigate(['staff/admin/manager/index'])
            .then(nav=>{
              
            },err=>{
              this.openSnackBar('Error!');
            });
        }
        else if(data.roleName == 'Manager'){
          this.router.navigate(['staff/manager'])
            .then(nav=>{
              
            },err=>{
              this.openSnackBar('Error!');
            });
        }

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.openSnackBar('Login or Password error!');
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration : 3000
    });
  }

}
