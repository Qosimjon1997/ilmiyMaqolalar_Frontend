import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorDto } from 'src/app/models/author-dto';
import { AuthorServiceService } from 'src/app/_services/author-service.service';

@Component({
  selector: 'app-view-guest-author',
  templateUrl: './view-guest-author.component.html',
  styleUrls: ['./view-guest-author.component.css']
})
export class ViewGuestAuthorComponent implements OnInit {

  constructor(private authorServise : AuthorServiceService, private router: Router) { }

  ngOnInit(): void {
    this.readUsers();
  }

  allAuthors? : AuthorDto[] = [];

  readUsers() : void{
    this.authorServise.getAllAuthors().subscribe(
      authors => {
        this.allAuthors = authors;
      },
      error => {
        console.log(error);
      }
    )
  }

}
