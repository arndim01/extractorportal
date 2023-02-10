import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { UserService } from '../_services/user/user.service';
import { UserClaims } from '../_model/user/user.model';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.getUserRoles().pipe(
      map( (e: any)=> {
        if( e){
          if( e.value !== "Admin"){
            this.router.navigate(['main/workflow']);
            return false;
          }
          return true;
        }else{
          console.log(e);
          return false;
        }
      }),
      catchError((err) => {
        this.router.navigate(['login']);
        return of(false);
      })
    )
  }
}
