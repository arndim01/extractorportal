import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Commodity } from '../../../_model/contract/commodity.model';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { CommodityService } from '../../../_services/contract/commodity.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkflowService } from 'src/app/_services/contract/workflow.service';
import { ContractDetails } from 'src/app/_model/contract/contract-details.model';
import { ContractDetailsService } from 'src/app/_services/contract/contract-details.service';
import { CommodityDialogComponent } from './commodity-dialog/commodity-dialog.component';
import { fadeInAnimation } from 'src/app/_animations';

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.css'],
  animations: [fadeInAnimation]
})
export class CommodityComponent implements OnInit {
  displayedColumns = ['main_value'];
  navTooltipPosition = "below";
  selected: any;
  selectedRow: number;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private commodities: any = [];
  constructor(public dialog: MatDialog, private commodityService: CommodityService, private workflowService: WorkflowService, private contractService: ContractDetailsService) { 
    //this.populate();
    this.workflowService.claimedWorkflow().subscribe(
      (response: any) => {
        console.log(response);

        if( response.status == 200){
          
          this.contractService.loadContractCommodity(response.body.hashId).subscribe(
            (response: any) => {
              if( response.status == 200 ){
                this.populateTableView(response.body);
              }
            },
            (err: HttpErrorResponse) => {

            }
          );
        } 

      },  
      (err : HttpErrorResponse) => {

      }
    );
  }
  private populateTableView(commodity: any){
    setTimeout(()=>{
      this.dataSource = new MatTableDataSource(commodity);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit() {
  }
  DisplayInfo(commodity: any): void{
    this.selected = commodity;
    this.selectedRow = commodity.hashValue;
    console.log(this.selected);
  }
  OpenDialog(passData: any){
   let dialogRef = this.dialog.open(CommodityDialogComponent, {
      minHeight: '380px',
      maxHeight: '750px',
      width: '800px',
      data: {passData},
      disableClose: true
   });
   dialogRef.afterClosed().subscribe(result => {
    console.log(result);
   });   
  }

}
