import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  canActivate():boolean {
    let token=localStorage.getItem('signedToken');
    if(token!=undefined){
      return true;
    }
    else{
      var snackBar: MatSnackBar;
      var router: Router
      var dd=snackBar.open('Please Login to view the profile','Login',{
        duration: 3000
      });
      dd.onAction().subscribe(()=>{
        router.navigate(['/login']);
      });
      return false;
    }
  }
  
}
