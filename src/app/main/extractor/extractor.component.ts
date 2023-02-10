import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ContractDetails } from 'src/app/_model/contract/contract-details.model';
import { ContractDetailsService } from 'src/app/_services/contract/contract-details.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-extractor',
  templateUrl: './extractor.component.html',
  styleUrls: ['./extractor.component.css']
})
export class ExtractorComponent implements OnInit {
  validContractLoaded = false;
  extractorSelectedOption = 'CONV'; 
  constructor(private contractDetailsService: ContractDetailsService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    
  }

}
