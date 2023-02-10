import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../_services/user/user.service';
import { UserClaims } from '../../_model/user/user.model';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ContractManagerComponent } from '../contract-manager/contract-manager.component';
import { WorkflowService } from '../../_services/contract/workflow.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {
  
  public claimed = [];
  public workflow : Observable<any>;
  public workflowCount : number = 0;
  public CIK: string;
  displayedColumns: string[] = ['carrier', 'contract_id', 'amd_id', 'cont_type', 'created', 'claimed', 'started', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private router: Router, private userService: UserService, public userClaims: UserClaims, private workflowService: WorkflowService, private actr: ActivatedRoute) {
    this.workflow = Observable.of( this.actr.data.map(data => data.cres).subscribe((res) =>{
        if( res.status == 200 ){
          setTimeout(()=> {
            this.dataSource = new MatTableDataSource(res.body);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.workflowCount = res.body.length;
          }, 500);
          console.log(res.body);
          return res.body;
        }
    }));
  }
  ngOnInit() {
    this.CIK = localStorage.getItem("CIK");
    console.log(this.userClaims);
    // this.userService.getUserClaims().subscribe((data: any) => {
    //   this.userClaims = data;
    // }, 
    // (err : HttpErrorResponse) => {
    // });
    // this.contractService.getClaimedContracts().subscribe((response: any) => {
    //   this.claimed = response;
    // },
    // (err: HttpErrorResponse) => {

    // });

    //this.popuplateTable();

  }
  // popuplateTable(){
  //   this.workflowService.getAllWorkflow().subscribe(
  //     (response: any) => {
  //       if(response.status == 200){
  //         this.workflow = response.body;
  //         setTimeout(()=> {
  //           this.dataSource = new MatTableDataSource(this.workflow);
  //           this.dataSource.paginator = this.paginator;
  //           this.dataSource.sort = this.sort;
  //           this.workflowCount = this.workflow.length;
  //         }, 500);
  //       }
  //     },
  //     (err: HttpErrorResponse) =>{

  //     }
  //   );
  // }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setMode(contract: any){
    let dialogRef = this.dialog.open(ContractManagerComponent, {
      minHeight: '200px',
      width: '500px',
      data: {contract: contract},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.populateTable();
    });
  }
}
