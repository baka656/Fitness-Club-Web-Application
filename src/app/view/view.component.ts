import { Component, OnInit } from '@angular/core';
import { JoinService } from '../join.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  x:any;
  loading:boolean=true;
  constructor(private js:JoinService,private route:ActivatedRoute) { 
    this.js.getClassbyId({_id: this.route.snapshot.paramMap.get('id')}).subscribe(res=>{
      if(res['message']=="success")
      {
        this.loading=false;
        this.x=res['data'].workoutplan;
        console.log(this.x);
      }
      else
      {
        alert(res['message']);
      }
    });
  }

  ngOnInit(): void {
  }

}
