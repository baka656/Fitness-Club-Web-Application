import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileExitGuard implements CanDeactivate<ProfileComponent> {
  canDeactivate(
    component: ProfileComponent): boolean {
      return component.canDeactivate() ? true : confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
  }
  
}
