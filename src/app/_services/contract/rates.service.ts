import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RatesService {

  constructor(private http: HttpClient) {

  }
}
