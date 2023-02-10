import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContractUpload, ContractTable } from '../../_model/contract/contract-upload.model';
const rootUrl = environment.apiUrl;
@Injectable()
export class WorkflowService {
  constructor(private http: HttpClient) { }
  getAllRawContract(){
    return this.http.get(rootUrl + '/api/file/list', {observe: 'response'});
  }
  getAllWorkflow(){
    return this.http.get(rootUrl + '/api/workflow/list', {observe: 'response'});
  }
  assignContract(carrier: string, effectiveDate: string, expirationDate: string, contractId: string, amendmentId: string, amendmentType: string, fileName: string){
    var requestHeader = new HttpHeaders({'Content-Type': 'application/json'});
    const body = {
      Carrier: carrier,
      EffectiveDate: effectiveDate,
      ExpirationDate: expirationDate,
      ContractId: contractId,
      AmendmentId: amendmentId,
      AmendmentType: amendmentType,
      FileName: fileName
    };
    console.log(fileName);
    return this.http.post(rootUrl + '/api/file/assign', JSON.stringify({carrier, effectiveDate, expirationDate, 
      contractId, amendmentId, amendmentType, fileName }), {observe: 'response', headers: requestHeader});
  }
  activateWorkflow(contractTable: ContractTable){
    var requestHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(rootUrl + '/api/workflow/toogle', JSON.stringify(contractTable), {observe: 'response', headers: requestHeader});
  }
  claimWorkflow(workflowDetails: any){
    var requestHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(rootUrl + '/api/workflow/claim', JSON.stringify(workflowDetails), {observe: 'response', headers: requestHeader});
  }
  claimedWorkflow(){
    return this.http.get(rootUrl + '/api/workflow/claimed', {observe : 'response'});
  }

}
