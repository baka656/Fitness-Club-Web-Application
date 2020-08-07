import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Classes } from '../classes'
import { DatePipe } from '@angular/common';
import { JoinService } from '../join.service';

@Component({
  selector: 'app-post-course',
  templateUrl: './post-course.component.html',
  styleUrls: ['./post-course.component.scss']
})
export class PostCourseComponent implements OnInit {

  data:FormGroup;
 classes:Classes={};
 file:File;
  imageUrl:string|ArrayBuffer="";
  constructor(private fb:FormBuilder,private js:JoinService,private d:DatePipe/*,private dialref:MatDialogRef<PostcComponent>*/) { }

  ngOnInit() {
    this.data=this.fb.group({
      title: ['',Validators.required],
      shortdescription: [''],
      maingoal: ['',Validators.required],
      workouttype:[''],
      coursetype:['',Validators.required],
      traininglevel:['',Validators.required],
      programduration:[''],
      daysperweek:[''],
      timeperworkout:[''],
      equipmentsrequired:['',Validators.required],
      targetgender:[''],
      workoutinfo:[''],
      users:['']

    })
  }

  selectPic(imageFile:File){
    this.file=imageFile;
    let reader=new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload=()=>{
      this.imageUrl=reader.result;
    
    };
  }



  /*closeDialog(){
    this.dialref.close('cancel');
  }*/

  onSubmit(){
  alert(this.data);
    if (this.data.invalid) {
      alert("Invalid");
        return;
    }
  
  this.classes.date=new Date();
  let fd=new FormData();

  fd.append("classes",this.file);
  fd.append("title",this.data.get('title').value);
  fd.append("shortdescription",this.data.get('shortdescription').value);
  fd.append("maingoal",this.data.get('maingoal').value);
  fd.append("workouttype",this.data.get('workouttype').value);
  fd.append("coursetype",this.data.get('coursetype').value);
  fd.append("traininglevel",this.data.get('traininglevel').value);
  fd.append("programduration",this.data.get('programduration').value);
  fd.append("daysperweek",this.data.get('daysperweek').value);
  fd.append("timeperworkout",this.data.get('timeperworkout').value);
  fd.append("equipmentsrequired",this.data.get('equipmentsrequired').value);
  fd.append("targetgender",this.data.get('targetgender').value);
  fd.append("workoutplan",this.data.get('workoutinfo').value);
  fd.append("date",this.d.transform(this.classes.date,'MMMM d, y @t h:mm a'));
  /*for (var value of fd.values())
    alert(value);*/

  this.js.postClass(fd).subscribe(res=>{
    if(res['message']=='success'){
      alert("success");
    }
    else
    {
      alert(res['message']);
      console.log(res['message']);
    }
  });
}

}
