import { Component, OnInit } from '@angular/core';
import { JoinService } from '../join.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Classes } from '../classes';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.scss']
})
export class MycoursesComponent implements OnInit {

  classes:Classes[]=[];
  loading:boolean=true;
  constructor(private js:JoinService,private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.js.mycourses({username: localStorage.getItem('user')}).subscribe(res=>{
      if(res['message']=='success'){
        this.classes=(res['data']);
        this.loading=false;
        console.log(this.classes);
      }
      else
        console.log(res['message']);
    });
  }


  view(i){
    this.router.navigate(['/view',i._id]);
  }

}
