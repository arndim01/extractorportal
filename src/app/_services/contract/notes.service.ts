import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { group } from '@angular/animations';

const rootUrl = environment.apiUrl;

@Injectable()
export class NotesService {

  constructor(private http: HttpClient) { }

  getnotes(contractid: string, groupid: number){
    return this.http.get(rootUrl + "/api/contract/notes/" + contractid + "/" + groupid );
  }
  getNotesMainValue(hashValue: string  ){
    return this.http.get(rootUrl + "/api/contract/notesvalue/" + hashValue);
  }
}
