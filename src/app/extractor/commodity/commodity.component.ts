import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommodityDialogComponent } from './commodity-dialog/commodity-dialog.component';
import { ContractService } from '../shared/contract.service';
import { Router } from '@angular/router';
import { CommodityService } from '../../_services/contract/commodity.service';
import { ContractDetailsService } from '../../_services/contract/contract-details.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Commodity } from '../../_model/contract/commodity.model';


@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.css']
})
export class CommodityComponent implements OnInit, OnDestroy {
  displayedColumns = ['code', 'desc', 'nac', 'excl','action'];
  dataSource: MatTableDataSource<Commodity>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public commodities: any = [];
  constructor(public dialog: MatDialog, private contractData: ContractService, private router: Router, private contractDetailsService: ContractDetailsService, private commodityService: CommodityService) {
    this.populate();
  }
  populate(){
    if( this.commodityService.value.length == 0 ){
      this.commodityService.initializeDetails(this.contractDetailsService.value.Id).subscribe(
        (response: any) => {
          if(response.status == 200){
            this.commodityService.value = response.body;
            this.populateTableView();
          }
        },
        (err: HttpErrorResponse) => {
        }
      );
    }else{
      this.populateTableView();
    }
  }
  private populateTableView(){
    this.commodities =  this.commodityService.value;
    setTimeout(() =>{
      this.dataSource = new MatTableDataSource( this.commodities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },500);
  }
  ngOnInit() {
  }
  ngOnDestroy(){
  }
  openDialog(passData: any): void{
    
    let dialogRef = this.dialog.open(CommodityDialogComponent, {
      minHeight: '280px',
      maxHeight: '540px',
      width: '800px',
      data: {passData},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      localStorage.setItem("COM",  JSON.stringify( this.contractData.getContractData().commodity_details));
    })
  }
  Save(){
  }

}
