import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Classes} from '../classes'
import { JoinService } from '../join.service';
import { MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  classes:Classes={};
  user:string;
  data:string[]=[];
  x:boolean=false;
  constructor(private snackBar:MatSnackBar,private router:Router,private js:JoinService,private dialog: MatDialogRef<DisplayComponent>) { 
    this.js.getClassbyId({_id: localStorage.getItem('course')}).subscribe((res)=>{
      if(res['message']=="success")
      {
        this.classes=res['data'];
        console.log(this.classes);
        this.user=localStorage.getItem('user');
        console.log(this.user);
        if(this.user!==undefined){
          console.log(this.classes.users);
          if(this.classes.users!=undefined && this.classes.users.indexOf(this.user)!==-1)
            this.x=true;
        }
      }
      else
      {
        console.log(res['message']);
      }
    });
    

  }

  ngOnInit() {
  }
  
  closeDialog(){
        this.dialog.close('cancel');
  }

enroll(){
  if(this.user==undefined)
  {
    this.dialog.close();
    var dd=this.snackBar.open('Login to enroll to the course','Login',{
          duration: 3000
    });
    dd.onAction().subscribe(()=>{
      this.router.navigate(['/login']);
    });
  }
  else
  {
    let arr=this.classes.users;
    if(arr[0]=="")
      arr[0]=this.user;
    else
      arr.push(this.user);
    console.log(arr);
    this.classes.users=arr;
    this.js.enrollClass({username:this.user,classobj:this.classes}).subscribe((res)=>{
      if(res['message']=="success")
      {
        var dd=this.snackBar.open('Enrolled Successfully','My Courses',{
          duration: 3000
        });
        dd.onAction().subscribe(()=>{
          this.router.navigate(['/mycourses']);
        });
        this.closeDialog();
      }
      else
      {
        var dd=this.snackBar.open(res['message'],'',{
          duration: 3000
        });
      }
    });
  }
}

view()
{
  this.closeDialog();
  this.router.navigate(['/view',localStorage.getItem('course')]);
}

}
