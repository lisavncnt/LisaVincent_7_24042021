import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {};

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): Promise<boolean> | boolean {
                
    return new Promise(
      (resolve, reject) => {
        if (this.auth.isAuth == true && sessionStorage.getItem('token')) {
          resolve(true);
        } else {
          this.router.navigate(['/auth', 'signin']);
          resolve(false);
        }
    });
  }
  
}
