import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
const rootUrl = environment.apiUrl;

@Injectable()
export class SystemService {

  constructor(private http: HttpClient) { }
  getTemplateValues(){
    return this.http.get(rootUrl + '/api/contract/templatevalues');
  }
}
