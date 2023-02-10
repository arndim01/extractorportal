import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkflowService } from 'src/app/_services/contract/workflow.service';
import { ContractDetailsService } from 'src/app/_services/contract/contract-details.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTable, MatTableDataSource, MatPaginator, MatSort, MatAutocompleteSelectedEvent } from '@angular/material';
import { CityListService } from 'src/app/_services/contract/city-list.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, share } from 'rxjs/operators';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  displayedColumns = ['main_value'];
  displayedSearchColumns = ['city_name', 'city_state', 'city_country', 'city_fcode', 'action'];
  dataSource: MatTableDataSource<any>;
  dataSearch: MatTableDataSource<any>;
  selected: any;
  selectedRow: string;

  searchForm: FormGroup;
  isLoading = false;
  filteredCode: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private workflowService: WorkflowService, private contractService: ContractDetailsService, 
    private cityListService: CityListService, private fb: FormBuilder) {

    this.workflowService.claimedWorkflow().subscribe(

      (response: any) => {
        if(response.status == 200){
          this.contractService.loadContractCity(response.body.hashId).subscribe(
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
      (err: HttpErrorResponse) =>{

      }
    );

   }
  ngOnInit() {
    this.searchForm = this.fb.group({
      cityInput: null
    });

    this.searchForm.get('cityInput')
    .valueChanges
    .pipe(
      debounceTime(500),
      tap(() => this.isLoading = true),
      switchMap(value => this.cityListService.search(value, 1) 
        .pipe(
          finalize(() => this.isLoading = false)
        )
      )
    ).subscribe(city => this.filteredCode = city);
  }
  DisplayInfo(city : any){
    this.selectedRow = city.hashValue;
    this.cityListService.getCities(city.id).subscribe(
      (response : any) => {
        if(response.body != null){
          this.selected = response.body;
          this.dataSearch = new MatTableDataSource(this.selected.rateCityDetails); 
        }
      },
      (error : HttpErrorResponse) => {

      }
    )
    
  }
  addCity(events : MatAutocompleteSelectedEvent){
    let city : any = events.option.value;
    this.selected.rateCityDetails.push({id: city.id })
  }
  displayFn(surcharge: any){
    if(surcharge) {
      console.log(surcharge);
      return ""; 
    }
  }
  private populateTableView(city: any){
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(city);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
