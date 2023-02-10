import { Injectable } from '@angular/core'; 
import { environment } from   '../../../environments/environment';
import { ProgressHttp } from 'angular-progress-http';
import { RequestOptions, RequestMethod, Headers } from '@angular/http';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
const rootUrl = environment.apiUrl;

@Injectable()
export class SurchargeService {

    constructor(private http: HttpClient){}
    search(surcharge: any, page = 1){
        if(surcharge instanceof Object || surcharge == '' || surcharge == 'undefined' || surcharge == null){
            surcharge = 'a  ';
          }
          return this.http.get( rootUrl + '/api/surcharge/getsurcharges/' + surcharge)
          .pipe(
            tap((response) =>{
      
              return response;
            })
          );
    }
}
