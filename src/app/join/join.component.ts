import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ittop } from 'src/ittop';
import { Router } from '@angular/router';
import { JoinService } from '../join.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  matter:string;
  obj:Ittop={};
  constructor(private fb:FormBuilder,private router:Router,
    private js:JoinService,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.loading=false;
    this.registerForm = this.fb.group({
      email:    ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      fname: ['',Validators.required],
      lname: ['',Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]]
    },{validator: this.checkIfMatchingPasswords()});
  }

  get f() { 
    return this.registerForm.controls; 
  }  

  checkIfMatchingPasswords() {
    return (group: FormGroup) => {
      let passwordInput = group.controls['password'],
          passwordConfirmationInput = group.controls['cpassword'];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }



  onSubmit() {
    this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }
    this.js.validEmail({email:this.registerForm.value.email}).subscribe(data=>{
      console.log(data);
      if(data==true){
        this.loading=true;
        this.obj.username=this.registerForm.value.username;
        this.obj.password=this.registerForm.value.password;
        this.obj.lname=this.registerForm.value.lname;
        this.obj.fname=this.registerForm.value.fname;
        this.obj.email=this.registerForm.value.email;
        this.obj.gender='';
        this.obj.weight=0;
        this.obj.height=0;
        this.obj.joindate=new Date();
        this.obj.contact=0;
        this.obj.efreq='';
        this.obj.address='';
        this.obj.city='';
        this.obj.state='';
        this.obj.country='';
        this.obj.pincode=0;
        this.obj.img='http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
        this.obj.about='';
        this.obj.courses=[];
        
        this.js.joinuser(this.obj).subscribe((res)=>{
          if(res["message"]=="user exists")
          {
            var dd=this.snackBar.open('An user already exists with that username!','',{
              duration: 3000
            });
          }
          if(res["message"]=="user created")
          {
            this.loading=false;
            var dd=this.snackBar.open('Successfully Registered^_^! Please check your inbox!','',{
              duration: 3000
            }); 
            this.router.navigate(['/login'])
          }
          
        });
        }
      else{
        alert("enter valid email");
      }
    });
    
    
  }
  
}
