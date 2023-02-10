import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Misc } from '../shared/model/misc.model';
import { ContractService } from '../shared/contract.service';
import { RatesDialogComponent } from './rates-dialog/rates-dialog.component';
import { RouteProgressService } from '../shared/route-progress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit, OnDestroy {
  displayedColumns = ['sco','val','hea','tab', 'action'];
  dataSource: MatTableDataSource<Misc>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  constructor(public dialog: MatDialog, private contractData: ContractService, private router: Router) { 
    this.dataSource = new MatTableDataSource(this.contractData.getContractData().rates_details);

  }
  ngOnInit() {
  }
  openDialog(passData: any): void{
    let dialogRef = this.dialog.open(RatesDialogComponent, {
      minHeight: '275px',
      maxHeight: '610px',
      maxWidth: '100vw',
      width: '1300px',
      data: {rates:passData},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      localStorage.setItem("RID", JSON.stringify( this.contractData.getContractData().rates_details));
    })
  }
  ngOnDestroy(){
    localStorage.setItem("RID", JSON.stringify( this.contractData.getContractData().rates_details));
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
