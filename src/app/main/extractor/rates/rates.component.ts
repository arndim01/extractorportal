import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ContractDetailsService } from 'src/app/_services/contract/contract-details.service';
import { WorkflowService } from 'src/app/_services/contract/workflow.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {

  //Table
  displayedColumns = ["id", "message"];
  dataSource : MatTableDataSource<any>;
  seletedRowIndex: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private workflowService: WorkflowService, private contractService: ContractDetailsService) { 
    this.workflowService.claimedWorkflow().subscribe(
      (response: any) => {
        if(response.status == 200){
          this.contractService.loadContractRates(response.body.hashId).subscribe(
            (response: any) => {
              if(response.status == 200){
                this.populateTableView(response.body);
              }
            },
            (err: HttpErrorResponse) => {

            }
          );
        }
      },
      (err: HttpErrorResponse) => {

      }
    );
  }
  private populateTableView(data: any){
    setTimeout(()=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit() {
  }
}
