import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Misc } from '../shared/model/misc.model';
import { ContractService } from '../shared/contract.service';
import { ArbsDialogComponent } from './arbs-dialog/arbs-dialog.component';
import { RouteProgressService } from '../shared/route-progress.service';

@Component({
  selector: 'app-arbs',
  templateUrl: './arbs.component.html',
  styleUrls: ['./arbs.component.css']
})
export class ArbsComponent implements OnInit, OnDestroy {

  displayedColumns = ['sco','val','hea', 'loc','rat', 'action'];
  dataSource: MatTableDataSource<Misc>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private contractData: ContractService) {
    this.dataSource = new MatTableDataSource(this.contractData.getContractData().arbs_details);

    console.log(this.contractData.getContractData().arbs_details)

   }

  ngOnInit() {
  }
  ngOnDestroy(){
    localStorage.setItem("AID", JSON.stringify(this.contractData.getContractData().arbs_details));
  }
  openDialog(passData: any): void{
    let dialogRef = this.dialog.open(ArbsDialogComponent, {
      minHeight: '275px',
      maxHeight: '610px',
      maxWidth: '100vw',
      width: '1300px',
      data: {arbs: passData},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      localStorage.setItem("AID", JSON.stringify(this.contractData.getContractData().arbs_details));
    })
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
