import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JoinService } from '../join.service';
import { AppComponent } from '../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [JoinService]
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router,private js:JoinService,
    public ac:AppComponent,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.loading=false;
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get f() { return this.registerForm.controls; }  

  onSubmit() {
    this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }
    this.loading=true;
    var nn=this.registerForm.get('username').value;
    var a=this.registerForm.get('password').value;
    this.js.login(this.registerForm.value).subscribe((res)=>{
      if(res['message']=='invalid username'){
        var dd=this.snackBar.open('Invalid Username! Please register','Register',{
          duration: 3000
        });
        dd.onAction().subscribe(()=>{
          this.router.navigate(['/join']);
        });
        this.loading=false;
      }
      if(res['message']=='invalid password'){
        var dd=this.snackBar.open('Invalid Password! Please try again','',{
          duration: 3000
        });
        this.loading=false;
      }
      if(res['message']=='success'){
        localStorage.setItem('user',nn);
        this.loading=false;
        var dd=this.snackBar.open('Welcome to fitnessClub family '+res['username']+'*_*','',{
          duration: 3000
        });
        localStorage.setItem('signedToken',res['token']);
        this.ac.user=nn;
        this.ac.z=true;
        this.router.navigate(['/home']);
      }
    });
  }


}
