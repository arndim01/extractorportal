import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
const rootUrl = environment.apiUrl;

@Injectable()
export class ContractDetailsService {
  constructor(private http:HttpClient) { }
  getContractDetails(){
    const contractId = localStorage.getItem("CIK");
    //return this.http.get()
  }
}
