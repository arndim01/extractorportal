import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Commodity } from '../../_model/contract/commodity.model';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

const rootUrl = environment.apiUrl;

@Injectable()
export class CommodityService {
  public value: Array<Commodity> = [];
  constructor(private http: HttpClient) { 
  }
  initializeDetails(id: number){
    return this.http.get(rootUrl + "/api/commodity/list/" + id, {observe: 'response'});
  }
  getCommodities() {
    return this.http.get(rootUrl + "/api/commodity/list", {observe: 'response'});
  }

  updateCommodity(passData: any){
    var requestHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(rootUrl + '/api/contract/commodity/update', JSON.stringify(passData), {observe: 'response', headers: requestHeader} );
  }

}
