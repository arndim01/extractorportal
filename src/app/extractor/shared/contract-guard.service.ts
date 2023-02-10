import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ContractService } from './contract.service';

@Injectable()
export class ContractGuardService implements CanActivate {

  constructor(private router: Router, private contractData: ContractService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if( localStorage.getItem('CIK') ){
      return true;
    }
    if( localStorage.getItem('CID') == null){
      this.router.navigate(['/extractor'], {queryParams:{returnUrl: state.url}});
    }
    this.router.navigate(['/main/workflow']);
    return false;
  }
}
