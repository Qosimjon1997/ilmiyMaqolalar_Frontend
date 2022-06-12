import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurriculumDto } from 'src/app/models/curriculum-dto';
import { CurriculumServiceService } from 'src/app/_services/curriculum-service.service';

@Component({
  selector: 'app-view-guest-curriculum',
  templateUrl: './view-guest-curriculum.component.html',
  styleUrls: ['./view-guest-curriculum.component.css']
})
export class ViewGuestCurriculumComponent implements OnInit {

  constructor(private curriculumServise : CurriculumServiceService, private router: Router) { }

  ngOnInit(): void {
    this.readUsers();
  }

  allCurriculums? : CurriculumDto[] = [];

  readUsers() : void{
    this.curriculumServise.getAllCurriculums().subscribe(
      curriculums => {
        this.allCurriculums = curriculums;
      },
      error => {
        console.log(error);
      }
    )
  }

}
