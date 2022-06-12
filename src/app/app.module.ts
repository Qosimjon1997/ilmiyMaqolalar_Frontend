import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { authInterceptorProviders } from './_helper/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import  { PdfViewerModule }  from  'ng2-pdf-viewer';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddManagerComponent } from './components/admin/manager/add-manager/add-manager.component';
import { ViewManagersComponent } from './components/admin/manager/view-managers/view-managers.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StaffComponent } from './components/staff/staff.component';
import { GuestComponent } from './components/guest/guest.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AddAuthorComponent } from './components/manager/authors/add-author/add-author.component';
import { ViewAuthorComponent } from './components/manager/authors/view-author/view-author.component';
import { ViewArticleComponent } from './components/manager/articles/view-article/view-article.component';
import { AddArticleComponent } from './components/manager/articles/add-article/add-article.component';
import { ViewCurriculumComponent } from './components/manager/curriculums/view-curriculum/view-curriculum.component';
import { AddCurriculumComponent } from './components/manager/curriculums/add-curriculum/add-curriculum.component';
import { ViewGuestArticleComponent } from './components/guests/view-guest-article/view-guest-article.component';
import { ViewGuestAuthorComponent } from './components/guests/view-guest-author/view-guest-author.component';
import { ViewGuestCurriculumComponent } from './components/guests/view-guest-curriculum/view-guest-curriculum.component';
import { AboutUsComponent } from './components/guests/about-us/about-us.component';
import { ViewAboutAuthorComponent } from './components/guests/view-about-author/view-about-author.component';
import { ViewAboutCurriculumComponent } from './components/guests/view-about-curriculum/view-about-curriculum.component';
import { UploadComponent } from './components/manager/upload/upload.component';
import { DownloadComponent } from './components/manager/download/download.component';
import { OpenArticleComponent } from './components/guests/open-article/open-article.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewManagersComponent,
    AddManagerComponent,
    ResetPasswordComponent,
    PageNotFoundComponent,
    StaffComponent,
    GuestComponent,
    DashboardComponent,
    AddAuthorComponent,
    ViewAuthorComponent,
    ViewArticleComponent,
    AddArticleComponent,
    ViewCurriculumComponent,
    AddCurriculumComponent,
    ViewGuestArticleComponent,
    ViewGuestAuthorComponent,
    ViewGuestCurriculumComponent,
    AboutUsComponent,
    ViewAboutAuthorComponent,
    ViewAboutCurriculumComponent,
    UploadComponent,
    DownloadComponent,
    OpenArticleComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatExpansionModule,
    MatCardModule,
    NgxDocViewerModule,
    NgxExtendedPdfViewerModule,
    PdfViewerModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
