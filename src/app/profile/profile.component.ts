import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Ittop } from 'src/ittop';
import { JoinService } from '../join.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [JoinService]
})
export class ProfileComponent implements OnInit {

  mainForm: FormGroup;
  aboutForm: FormGroup;
  passForm: FormGroup;
  file:File;
  imageUrl:string|ArrayBuffer="http://ssl.gstatic.com/accounts/ui/avatar_2x.png";
  data:Ittop={};
  loading: Boolean=false;
  constructor(private formBuilder: FormBuilder,private js:JoinService,private snackBar:MatSnackBar) { }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    if(this.mainForm.pristine && this.aboutForm.pristine && this.passForm.pristine)
      return true;
    else
      return false;
  }

  ngOnInit() {
    this.loading=false;
    this.data.username=localStorage.getItem('user');
    this.js.profileRead(this.data).subscribe((res)=>{
      this.data=res['data'];
      this.imageUrl=this.data.img;
      console.log(this.data);
    });
    this.passForm = this.formBuilder.group({
      password: [''],
      confirmpassword: [''],
      newpassword: ['']
    });
    this.aboutForm = this.formBuilder.group({
      about: [this.data.about]
    });
    this.mainForm = this.formBuilder.group({
      username: [this.data.username],
      fname: [this.data.fname],
      lname: [this.data.lname],
      dob: [this.data.dob],
      gender: [this.data.gender],
      weight: [this.data.weight],
      height: [this.data.height],
      email: [this.data.email],
      efreq: [this.data.efreq],
      contact: [this.data.contact],
      address: [this.data.address],
      city: [this.data.city],
      state: [this.data.state],
      country: [this.data.country],
      pincode: [this.data.pincode]
  });
  }

  changePass(passform: FormGroupDirective){
    console.log(this.passForm.value);
    if(this.passForm.get('password').value!="" && this.passForm.get('newpassword').value!="" 
      && this.passForm.get('confirmpassword').value!="" && this.passForm.get('newpassword').value==this.passForm.get('confirmpassword').value){
        this.js.changePassword({user: this.data.username,pass: this.passForm.get('password').value,newpass: this.passForm.get('newpassword').value}).subscribe((res)=>{
          if(res['message']=='success'){
            var dd=this.snackBar.open('Password changed Successfully','',{
              duration: 3000
            });
            passform.resetForm();
            this.passForm.reset();
          }
          if(res['message']=='invalid username'){
            var dd=this.snackBar.open('User donot exist...','',{
              duration: 3000
            });
          }
          if(res['message']=='invalid password'){
            var dd=this.snackBar.open('Invalid current password...','',{
              duration: 3000
            });
          }
        });
    }
    else{
      if(this.passForm.get('password').value==""){
        var dd=this.snackBar.open('Enter current password','',{
          duration: 3000
        });
      }
      else if(this.passForm.get('newpassword').value!=this.passForm.get('confirmpassword').value){
        var dd=this.snackBar.open('Passwords donot match...','',{
          duration: 3000
        });
      }
      else  {
        var dd=this.snackBar.open('Enter current and new password','',{
        duration: 3000
      });}
    }
  }


  profileImage(imageFile:File)
  {
    this.loading=true;
    console.log("Image is ",imageFile);
    this.file=imageFile;
    
    let fd=new FormData();
    fd.append('photo',this.file);
    fd.append('user',this.data.username);
    console.log(fd.get('user'));
    this.js.dpUpdate(fd).subscribe((res)=>{
      if(res['message']=='success'){
        var dd=this.snackBar.open('Profile Picture Updated!','',{
          duration: 3000
        });
        let reader=new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload=()=>{
          this.imageUrl=reader.result;
        };
        this.loading=false;
      }
      else{
        console.log(res);
        var dd=this.snackBar.open('File size is too large. Max size is 10MB','',{
          duration: 3000
        });
        this.loading=false;
      }
    });
  }

  aboutSubmit(){
    if(this.aboutForm.get('about').value!=null)
      this.data.about=this.aboutForm.get('about').value;
    this.js.updateAbout({user: this.data.username,about: this.data.about}).subscribe((res)=>{
      if(res['message']=='success'){
        var dd=this.snackBar.open('About Updated!!','',{
          duration: 3000
        });
      }
      else if(res['message']=='invalid username'){
        var dd=this.snackBar.open('User donot exist!','',{
          duration: 3000
        });
      }
    });
  }

  mainSubmit(){
    if(this.mainForm.get('fname').value!=null)
      this.data.fname=this.mainForm.get('fname').value;
    if(this.mainForm.get('lname').value!=null)
      this.data.lname=this.mainForm.get('lname').value;
    if(this.mainForm.get('dob').value!=null)
      this.data.dob=this.mainForm.get('dob').value;
    if(this.mainForm.get('gender').value!=null)
      this.data.gender=this.mainForm.get('gender').value;
    if(this.mainForm.get('height').value!=null)
      this.data.height=this.mainForm.get('height').value;
    if(this.mainForm.get('weight').value!=null)
      this.data.weight=this.mainForm.get('weight').value;
    if(this.mainForm.get('email').value!=null)
      this.data.email=this.mainForm.get('email').value;
    if(this.mainForm.get('efreq').value!=null)
      this.data.efreq=this.mainForm.get('efreq').value;
    if(this.mainForm.get('contact').value!=null)
      this.data.contact=this.mainForm.get('contact').value;
    if(this.mainForm.get('address').value!=null)
      this.data.address=this.mainForm.get('address').value;
    if(this.mainForm.get('city').value!=null)
      this.data.city=this.mainForm.get('city').value;
    if(this.mainForm.get('state').value!=null)
      this.data.state=this.mainForm.get('state').value;
    if(this.mainForm.get('country').value!=null)
      this.data.country=this.mainForm.get('country').value;
    if(this.mainForm.get('pincode').value!=null)
      this.data.pincode=this.mainForm.get('pincode').value;
    console.log(this.data);
    
    
    this.js.profileUpdate(this.data).subscribe((res)=>{
      if(res['message']=='success')
      {
        var dd=this.snackBar.open('Profile Updated!!','',{
          duration: 3000
        });
      }
      else{
        console.log(res);
      }
    });
  }

  
}
