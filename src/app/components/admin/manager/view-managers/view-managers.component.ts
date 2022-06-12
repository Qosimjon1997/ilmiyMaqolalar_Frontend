import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManagersDto } from 'src/app/models/managers-dto';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AddManagerComponent } from '../add-manager/add-manager.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-view-managers',
  templateUrl: './view-managers.component.html',
  styleUrls: ['./view-managers.component.css']
})
export class ViewManagersComponent implements OnInit {

  allManagers : ManagersDto[] = [];
  constructor(private auth : AuthService, public dialog: MatDialog, private tokenStorageService: TokenStorageService, private router : Router) { }

  ngOnInit(): void {
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['/login'])
    }
    else if(this.tokenStorageService.getUser().roleName=='Manager'){
      this.router.navigate(['/staff/manager'])
    }
    this.readData();
  }

  readData(){
    this.auth.getAllManagers().subscribe(
      alldata => {
        this.allManagers = alldata;
      },
      error => console.log(error)
    );
  }

  btnOpenDialogForAddManager(){
    const dialogRef = this.dialog.open(AddManagerComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.readData();
    });
  }
}
