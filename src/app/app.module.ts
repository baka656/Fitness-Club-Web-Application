import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';
import { BmiComponent } from './bmi/bmi.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JoinService } from './join.service';
import { BlogComponent } from './blog/blog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatDialogModule} from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PostComponent } from './post/post.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DatePipe } from '@angular/common';
import { ShowblogComponent } from './showblog/showblog.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ClassesComponent } from './classes/classes.component';
import { DisplayComponent } from './display/display.component';
import { ViewComponent } from './view/view.component';
import { MycoursesComponent } from './mycourses/mycourses.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PostCourseComponent } from './post-course/post-course.component';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    JoinComponent,
    BmiComponent,
    ProfileComponent,
    ForgotpassComponent,
    BlogComponent,
    PageNotFoundComponent,
    PostComponent,
    ShowblogComponent,
    ClassesComponent,
    DisplayComponent,
    ViewComponent,
    MycoursesComponent,
    PostCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatListModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDividerModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    EditorModule
  ],
  entryComponents: [PostComponent],
  providers: [JoinService,AppComponent,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
