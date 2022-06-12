import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(private dialog : MatDialog, private tokenStorageService: TokenStorageService) { }

  adminRole : boolean = false;
  managerRole : boolean = false;
  ngOnInit(): void {
    if(this.tokenStorageService.getUser().roleName == "Admin"){
      this.adminRole = true;
    }
    else if(this.tokenStorageService.getUser().roleName == "Manager"){
      this.managerRole = true;
    }
  }

  btnLogout() : void {
    this.tokenStorageService.signOut();
    this.adminRole = false;
    this.managerRole = false;
    window.location.reload();
  }


}
