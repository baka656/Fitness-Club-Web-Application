import { Component } from '@angular/core';
import { JoinService } from './join.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [JoinService]
})
export class AppComponent {
  title = 'fitnessClub';
  sub:FormGroup;
  z:boolean=false;
  submitted = false;
  user:string;
  showComponent:boolean=false;
  routes:string[]=['/login','/home','/join','/bmi','/profile','/forgotpass','/blog','/','/view','/courses','/mycourses','/postcourse'];

  constructor(private js:JoinService,private router: Router,private snackBar:MatSnackBar,private fb:FormBuilder) { 
    this.sub = this.fb.group({
      email:    ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])]
    });
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
          console.log(event.url);
          if(event.url.indexOf('/blog/')!==-1 && event.url!=='/blog')
            this.showComponent=true;
          else if(event.url.indexOf('/view/')!==-1 && event.url!=='/view')
            this.showComponent=true;
          else
            this.showComponent = this.routes.indexOf(event.url) !== -1 ;
      }
    });
  }


  ngOnInit() {
    this.router.events.subscribe((evt)=>{
      if(!(evt instanceof NavigationEnd))
        return;
      window.scrollTo(0,0);
    })
    this.user=localStorage.getItem('user');
    if(this.user!=undefined)
      this.z=true;
  }
  
  myMethod()
  {
     let x=document.getElementById("nav");
     if(x.className === "nav")
      x.className="active";
     else
     if(x.className==="active")
      x.className="nav";
  }

  get f() { 
    return this.sub.controls; 
  }

  onSubscribe(){
    this.submitted = true;
    if (this.sub.invalid) {
      return;
    } 
    console.log(this.sub.get('email').value);
    this.js.subscrib({email: this.sub.get('email').value}).subscribe(res=>{
      if(res['message']=='success'){
        var dd=this.snackBar.open('Successfully Subscribed!!','',{
          duration: 3000
        });
        this.sub.reset();
      }
      else if(res['message']=='already subscribed'){
        var dd=this.snackBar.open('Already Subscribed!^_^','',{
          duration: 3000
        });
      }
      else  
        console.log(res['message']);
      this.submitted=false;
    });
  }

  logout(){
    localStorage.removeItem('signedToken');
    this.z=false;
    this.user='';
    var dd=this.snackBar.open('Hope you enjoyed our site!!','',{
      duration: 3000
    });
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }
  
}
