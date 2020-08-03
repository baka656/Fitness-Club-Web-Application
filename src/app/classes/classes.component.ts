import { Component, OnInit } from '@angular/core';
import { Classes } from '../classes'
import { JoinService } from '../join.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DisplayComponent} from '../display/display.component';
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  range:Classes[]=[];
  data:Classes={};
  user:string;
  loading:boolean=true;
  constructor(private js:JoinService,private router:Router,private dialog:MatDialog,private snackbar:MatSnackBar) { }

  ngOnInit() {
   this.js.getClass({}).subscribe(res=>{
      if(res["message"]=="success")
      {
        this.loading=false;
        this.range=res['data'];
      }
      else
       console.log((res['message']));
    });
  }
  method1(obj)
  {
    //alert(obj);
    localStorage.setItem('course',obj._id);
    var blogDialog=this.dialog.open(DisplayComponent,{
      height: '600px',
      width: '900px'
    });
  }
}

