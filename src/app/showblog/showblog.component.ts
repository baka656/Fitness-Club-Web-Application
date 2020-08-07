import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../../blog';
import { JoinService } from '../join.service';

@Component({
  selector: 'app-showblog',
  templateUrl: './showblog.component.html',
  styleUrls: ['./showblog.component.scss']
})
export class ShowblogComponent implements OnInit {

  blog:Blog={} as Blog
  loading:boolean=true;
  blogs:Blog[]=[];
  user;
  constructor(private route:ActivatedRoute,private js:JoinService,private router:Router) {
    this.initialize();
   }

  ngOnInit(): void {
  }
  initialize(){
    this.blogs=[];
    this.blog={};
    this.user=localStorage.getItem('user');
    this.js.getBlogById({id: this.route.snapshot.paramMap.get('id')}).subscribe(res=>{
      if(res['message']=='success'){
        this.blog=res['data'];
      }
      else
        console.log(res['message']);
    });
    console.log(this.blog)
    this.js.getBlog({user:this.user}).subscribe((da:any)=>{
        this.blogs=da.data;
        console.log(this.blogs)
        this.blogs=this.blogs.filter((x)=>{          
          if(x.title!=this.blog.title)
              return x;
      })
      this.loading=false;
    })
  }
  goto(k){
    this.loading=true;
    this.router.navigate(['/blog',k._id]).then(()=>{
      this.initialize();
    });
    
  }
}
