import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Blog } from 'blog';
import { DatePipe } from '@angular/common';
import { JoinService } from '../join.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  data:FormGroup;
  blog:Blog={};
  file:File;
  loading:boolean=false;
  imageUrl:string|ArrayBuffer="";

  constructor(private fb:FormBuilder,private dialogRef: MatDialogRef<PostComponent>,private dp:DatePipe,
    private js:JoinService, private router:Router,private snackBar:MatSnackBar) { 
  }

  ngOnInit(): void {
    this.blog.username=localStorage.getItem('user');
    this.data=this.fb.group({
      title: ['',Validators.required],
      subtitle: [''],
      story: ['',Validators.required]
    })
  }

  get f() { 
    return this.data.controls; 
  }  

  selectPic(imageFile:File){
    this.file=imageFile;
    let reader=new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload=()=>{
      this.imageUrl=reader.result;
    };
  }

  closeDialog(){
    this.dialogRef.close('cancel');
  }

  onSubmit(){
      if (this.data.invalid) {
          return;
      }
      
    this.loading=true;
    this.blog.date=new Date();
    let fd=new FormData();
    fd.append("blog",this.file);
    fd.append("user",this.blog.username);
    fd.append("title",this.data.get('title').value);
    fd.append("subtitle",this.data.get('subtitle').value);
    fd.append("story",this.data.get('story').value);
    fd.append("date",this.dp.transform(this.blog.date,'MMMM d, y @t h:mm a'));
    console.log(this.dp.transform(this.blog.date,'MMMM d, y @t h:mm a'));
    this.js.postBlog(fd).subscribe(res=>{
      if(res['message']=='success'){
        this.dialogRef.close('success');
        this.router.navigate(['/blog']);
      }
      else{
        console.log(res['message']);
        var dd=this.snackBar.open('File size is too large. Max size is 10MB','',{
          duration: 3000
        });
      }
    });
    this.loading=false;
  }

}
