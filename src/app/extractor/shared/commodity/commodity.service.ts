import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { TagContentType } from '@angular/compiler';
import { Commodity } from '../model/commodity.model';
const httpOptions = {
  hearders: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CommodityService {
  private commodityUrl = 'api/commodity';
  
  constructor(private http: HttpClient) { 


  }
  getCommodityList(): Observable<Commodity[]>{
    return this.http.get<Commodity[]>(this.commodityUrl)
      .pipe(
        tap(commodity => this.log('Fetched commodities')),
        catchError(this.handleError('getCommodityList', []))
      );
  }
  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  private log(message: string){
    console.log(message);
  }
}
