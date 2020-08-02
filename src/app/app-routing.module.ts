import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { BmiComponent } from './bmi/bmi.component';
import { LogrouteGuard } from './logroute.guard';
import { BlogComponent } from './blog/blog.component';
import { ProfileGuard } from './profile.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostComponent } from './post/post.component';
import { ShowblogComponent } from './showblog/showblog.component';
import { ClassesComponent } from './classes/classes.component';
import { ViewComponent } from './view/view.component';
import { MycoursesComponent } from './mycourses/mycourses.component';
import { ProfileExitGuard } from './profile-exit.guard';
import { PostCourseComponent } from './post-course/post-course.component';


const routes: Routes = [
  { path: '',    
    redirectTo: 'home',    
    pathMatch: 'full'    
  }, 
  { path:'login', component:LoginComponent,canActivate:[LogrouteGuard]},
  { path:'join', component:JoinComponent,canActivate:[LogrouteGuard]}, 
  { path:'home', component:HomeComponent},
  { path:'profile', component:ProfileComponent,canActivate:[ProfileGuard],canDeactivate:[ProfileExitGuard]},
  { path:'forgotpass', component:ForgotpassComponent,canActivate:[LogrouteGuard]},
  { path:'bmi', component:BmiComponent},
  { path:'blog',component:BlogComponent},
  { path:'post',component:PostComponent},
  { path:'courses',component:ClassesComponent},
  { path:'mycourses',component:MycoursesComponent},
  { path:'view/:id',component:ViewComponent},
  { path:'blog/:id',component:ShowblogComponent},
  { path:'postcourse',component:PostCourseComponent},
  { path:'**', 
    pathMatch: 'full', 
    component:PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
