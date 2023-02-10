import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ContractChildGuardService implements CanActivateChild {

  constructor(private router: Router) { }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    :Observable<boolean> | Promise<boolean> | boolean{
      let data = route.data["data"];
      if( data ){
        return true;
      }


      this.router.navigate(['/extractor-tool']);
      return false;
    }
}
