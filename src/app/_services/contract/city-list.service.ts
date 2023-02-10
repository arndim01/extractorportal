import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ProgressHttp } from 'angular-progress-http';
import { RequestOptions, RequestMethod, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { CityDetails } from '../../_model/contract/city.model';


const rootUrl = environment.apiUrl;

@Injectable()
export class CityListService {
  public value: Array<CityDetails> = [];
  constructor(private http: HttpClient) { }
  search(city :any, page =1 ){

    if(city instanceof Object || city == '' || city == 'undefined' || city == null){
      city = 'aaaaa';
      //return null;
    }
    return this.http.get( rootUrl + '/api/contract/lookupcity/' + city)
    .pipe(
      tap((response) => {
        return response;
      })  
    );
  }
  getCities(id: number){
    return this.http.get(rootUrl + "/api/contract/getcity/" + id, {observe: 'response'});
  }

  
}

