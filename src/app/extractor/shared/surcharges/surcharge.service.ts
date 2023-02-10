import { Injectable } from '@angular/core';
import { ProgressHttp } from 'angular-progress-http';
import { tap } from 'rxjs/operators';
import { ContractService } from '../contract.service';
import { RequestOptions, RequestMethod, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SurchargeService {

  constructor(private http: ProgressHttp) { }
  search(surcharge: any, page =1){
    if(surcharge instanceof Object || surcharge == '' || surcharge == 'undefined' || surcharge == null){
      surcharge = 'a';
    }

  var headerOptions = new Headers({'Authorization' : 'Bearer ' + localStorage.getItem("userToken")});
  var requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions });


    return this.http.get( ContractService.MAIN_URL + 'api/surcharges/getsurcharges/' + surcharge, requestOptions)
    .pipe(
      tap((response) =>{

        return response.json();
      })
    );
  }
}
