import { Component, OnInit } from '@angular/core';
import { JoinService } from '../join.service';
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { Blog } from 'blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  range:Blog[]=[];
  data:Blog={};
  user:string;
  loading:boolean=true;
  constructor(private ls:JoinService,private dialog:MatDialog,private snackBar:MatSnackBar,private router: Router) {
    this.initialize()
   }

   ngOnInit(){}
   initialize() {
     this.user=localStorage.getItem('user');
     this.ls.getBlog({user: this.user}).subscribe((data)=>{
         if(data['message']=='success'){
           console.log(data);
           this.loading=false;
           this.range=data['data'];
         }
         else
           console.log(data);
     });
   }

  postBlog(){
    if(this.user==undefined){
      var dd=this.snackBar.open('Please login to post something!','Login',{
        duration: 3000
      });
      dd.onAction().subscribe(()=>{
        this.router.navigate(['/login']);
      });
    }
    else{
      this.data.username=localStorage.getItem('user');
      console.log(this.data);
      var blogDialog=this.dialog.open(PostComponent,{
        height: '70%',
        width: '70%'
      });
      blogDialog.afterClosed().subscribe(res=>{
        console.log(res);
        if(res=='success'){
          var dd=this.snackBar.open('Posted Successfully. Thank you!','',{
          duration: 3000
          });
          this.loading=true;
          this.ls.getBlog({user: this.user}).subscribe((data)=>{
            if(data['message']=='success'){
              console.log(data);
              this.loading=false;
              this.range=data['data'];
            }
            else
              console.log(data);
          });
        }
      });
    }
  }

  show(i){
    console.log(JSON.stringify(i._id));
    this.router.navigate(['/blog',i._id]);
}
}
