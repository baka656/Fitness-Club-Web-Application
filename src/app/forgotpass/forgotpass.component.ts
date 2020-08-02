import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JoinService } from '../join.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router,private js:JoinService,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.loading=false;
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required]
  });
  }

  get f() { return this.registerForm.controls; }  

  onSubmit() {
    this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }
    this.loading=true;
    this.js.forgotpass(this.registerForm.value).subscribe((res)=>{
      if(res['message']=='invalid username'){
        var dd=this.snackBar.open('Sorry, there is no user with that username!','',{
          duration: 3000
        });
      }
      if(res['message']=='success'){
        var dd=this.snackBar.open('Email sent! Please check your inbox..','',{
          duration: 3000
        });
        this.loading=false;
        this.router.navigate(['/login']);
      }
    });
  }
}
