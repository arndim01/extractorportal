import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FileManagerComponent } from '../file-manager/file-manager.component';
import { WorkflowService } from '../../_services/contract/workflow.service';
import { UserService } from '../../_services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserClaims } from '../../_model/user/user.model';
import { Router } from '@angular/router';
import { ContractTable } from '../../_model/contract/contract-upload.model';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  displayedColumns: string[] = ['name', 'cid', 'aid', 'cot',  'createdon', 'createdby', 'started'];
  dataSource: MatTableDataSource<ContractTable>;
  contracts: any= [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private workflowService: WorkflowService, 
    private userService: UserService, public userClaims: UserClaims, private router: Router) { 
    // Assign the data to the data source for the table to render
    this.populateTable();
  
  }

  ngOnInit() {
    //console.log(this.userClaims.FirstName);

  }
  onChange(value, current_value){
    console.log(value);
    console.log(current_value);
    this.workflowService.activateWorkflow(current_value).subscribe(

      (response: any) => {
        if(response.status == 200){
          console.log(response.body);
        }
      },
      (err: HttpErrorResponse) => {

      }
    )
  }
  populateTable(){
    this.workflowService.getAllRawContract().subscribe(
      (response : any) => {
        if( response.status == 200 ){
          this.contracts = response.body;
          setTimeout(()=> {
            this.dataSource = new MatTableDataSource(this.contracts);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 500);

        }
      },
      (err : HttpErrorResponse) =>{

      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openManager(){
    let dialogRef = this.dialog.open(FileManagerComponent, {
      minHeight: '120px',
      maxHeight: '700px',
      width: '500px',
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {


      //VERY BAD LOGIC... WILL UPDATE LATER
      this.populateTable();
    });
  }

}

