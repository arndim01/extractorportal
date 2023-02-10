import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Misc } from '../shared/model/misc.model';
import { ContractService } from '../shared/contract.service';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.css']
})
export class MiscComponent implements OnInit {
  displayedColumns = ['poi','haz','sco','ser', 'action'];
  dataSource: MatTableDataSource<Misc>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  constructor(private contractData: ContractService) { 
    //this.dataSource = new MatTableDataSource(this.contractData.getContractData().misc);
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
