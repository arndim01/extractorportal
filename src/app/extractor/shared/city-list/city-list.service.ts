import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ProgressHttp } from 'angular-progress-http';
import { ContractService } from '../contract.service';
import { RequestOptions, RequestMethod, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CityListService {

  constructor(private http: ProgressHttp) { }
  search(city :any, page =1 ){

    if(city instanceof Object || city == '' || city == 'undefined' || city == null){
      city = 'a';
    }

    var headerOptions = new Headers({'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
    });
    var requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions });


      return this.http.get( ContractService.MAIN_URL + 'api/unlocs/getunlocs/' + city, requestOptions)
      .pipe(
        tap((response) => {
          console.log(response);
          // response.results = response.results
          // .map(unloc => new UnlocCity(unloc.city, unloc.state, unloc.country, unloc.code))
          return response.json();
        })  
      );
    
    
  }
}

export interface IUnlocInterface{
  results: UnlocCity[];
}
export class UnlocCity{
  constructor(public id: number, public city: string, public state: string, public country: string, public f_code: string){}
}
