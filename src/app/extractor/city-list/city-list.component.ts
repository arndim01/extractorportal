import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatPaginator, MatSort, MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { CityListDialogComponent } from './city-list-dialog/city-list-dialog.component';
import { ContractService } from '../shared/contract.service';
import { RouteProgressService } from '../shared/route-progress.service';
import { CityListService } from '../../_services/contract/city-list.service';
import { ContractDetailsService } from '../../_services/contract/contract-details.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CityDetails } from '../../_model/contract/city.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
})
export class CityListComponent implements OnInit, OnDestroy {
  displayedColumns = ['code', 'names', 'action'];
  dataSource: MatTableDataSource<CityDetails>;
  public cities: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, public contractData: ContractService, 
    private contractDetailsService: ContractDetailsService, private cityService: CityListService) { 
    if( cityService.value.length == 0 ){
      this.cityService.getCities(contractDetailsService.value.Id).subscribe(
        (response: any) => {
          if( response.status == 200 ){
            this.cityService.value = response.body;
            console.log(this.cityService.value);
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
    this.cities = this.cityService.value;
    setTimeout(() =>{
      this.dataSource = new MatTableDataSource(this.cities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },500);
  }

  ngOnInit() {
    
  }
  ngOnDestroy(){
   
  }
  openDialog(passData: any): void{
    let dialogRef = this.dialog.open(CityListDialogComponent, {
      width: '800px',
      data: {city:passData}
    });
    dialogRef.afterClosed().subscribe(result => {
      //localStorage.setItem("CIT", JSON.stringify(this.contractData.getContractData().city_details));
    })
  }
}

