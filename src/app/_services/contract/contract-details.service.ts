import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ContractDetails } from '../../_model/contract/contract-details.model';
const rootUrl = environment.apiUrl;

@Injectable()
export class ContractDetailsService {
  constructor(private http:HttpClient) { }
  public value: ContractDetails;
  
  initializeDetails(){
    const contractId = localStorage.getItem("CIK");
    return this.http.get(rootUrl + '/api/contract/details/' + contractId, {observe: 'response'});
  }
  getContractDetails(){
    const contractId = localStorage.getItem("CIK");
    return this.http.get(rootUrl + '/api/contract/details/' + contractId)
  }
  updateContractDetails(contract: ContractDetails){
    var requestHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(rootUrl + '/api/contract/savedetails', JSON.stringify(contract),  {observe: 'response', headers: requestHeader});
  }
  loadContractDetails(id: string){
    var requestHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(rootUrl + '/api/contract/load/' + id, {observe: 'response', headers :requestHeader});
  }
  loadContractCommodity(hash: string){
    return this.http.get(rootUrl + '/api/contract/commodity/' + hash, {observe :'response'});
  }
  loadContractCity(hash:string){
    return this.http.get(rootUrl + '/api/contract/city/' + hash, {observe:'response'});
  }
  loadContractGeneralNotes(hash: string){
    return this.http.get(rootUrl + '/api/contract/notes/' + hash, {observe:'response'});
  }
  loadContractRates(hash: string){
    return this.http.get(rootUrl + '/api/contract/rates/' + hash, {observe: 'response'});
  }
}
