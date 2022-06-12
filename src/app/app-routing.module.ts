import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewManagersComponent } from './components/admin/manager/view-managers/view-managers.component';
import { GuestComponent } from './components/guest/guest.component';
import { AboutUsComponent } from './components/guests/about-us/about-us.component';
import { OpenArticleComponent } from './components/guests/open-article/open-article.component';
import { ViewAboutAuthorComponent } from './components/guests/view-about-author/view-about-author.component';
import { ViewAboutCurriculumComponent } from './components/guests/view-about-curriculum/view-about-curriculum.component';
import { ViewGuestArticleComponent } from './components/guests/view-guest-article/view-guest-article.component';
import { ViewGuestAuthorComponent } from './components/guests/view-guest-author/view-guest-author.component';
import { ViewGuestCurriculumComponent } from './components/guests/view-guest-curriculum/view-guest-curriculum.component';
import { LoginComponent } from './components/login/login.component';
import { ViewArticleComponent } from './components/manager/articles/view-article/view-article.component';
import { ViewAuthorComponent } from './components/manager/authors/view-author/view-author.component';
import { ViewCurriculumComponent } from './components/manager/curriculums/view-curriculum/view-curriculum.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StaffComponent } from './components/staff/staff.component';

const routes: Routes = [
  { path: '', redirectTo: 'guest/aboutus', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'staff', component: StaffComponent,
    children: [
      {
        path: "admin",
        children: [
          {
            path: "manager",
            children: [
              { path: "index", component: ViewManagersComponent },
            ]
          }
        ]
      },
      {
        path: "manager",
        children: [
          {
            path: "author",
            children: [
              { path: "index", component: ViewAuthorComponent },
            ]
          },
          {
            path: "article",
            children: [
              { path: "index", component: ViewArticleComponent },
            ]
          },
          {
            path: "curriculum",
            children: [
              { path: "index", component: ViewCurriculumComponent },
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'guest', component: GuestComponent,
    children: [
      { path: "articles", component:  ViewGuestArticleComponent},
      { path: "authors", component:  ViewGuestAuthorComponent},
      { path: "authors/:id", component:  ViewAboutAuthorComponent},
      { path: "openarticle/:id", component:  OpenArticleComponent},
      { path: "curriculums", component:  ViewGuestCurriculumComponent},
      { path: "curriculums/:id", component:  ViewAboutCurriculumComponent},
      { path: "aboutus", component:  AboutUsComponent},

    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
