import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { ContractService } from '../../shared/contract.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { startWith, map, debounceTime, finalize, tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Unlocs } from '../../../_model/contract/city.model';
import { CityListService } from '../../../_services/contract/city-list.service';

export interface CityInfo{
  City: string;
  Country: string;
  Full_Code: string;
  ISO_Country: string;
  State: string;
  State_Code: string;
}

@Component({
  selector: 'app-city-list-dialog',
  templateUrl: './city-list-dialog.component.html',
  styleUrls: ['./city-list-dialog.component.css']
})
export class CityListDialogComponent implements OnInit{
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  city: CityInfo[];


  //NEW
  filteredUnloc: any = [];
  unlocForm: FormGroup;
  isLoading = false;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private cityService: CityListService, public dialogRef: MatDialogRef<CityListDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log(data);

  }
  ngOnInit() {

    this.unlocForm = this.fb.group({
      cityInput: null
    });

    this.unlocForm
    .get('cityInput')
    .valueChanges
    .pipe(
      debounceTime(500),
      tap(() => this.isLoading = true),
      switchMap(value => this.cityService.search(value, 1)
        .pipe(
          finalize(() => this.isLoading = false),
        )
      )
    )
    .subscribe(city => {
      if( city != null){
        this.filteredUnloc =  city;
      }else{
        this.filteredUnloc = [];
      }
    });


  }
  onNoClick(): void{
    this.dialogRef.close();
  }
  remove(city: any): void {
    let index = this.data.city.Unlocs.indexOf(city);
    console.log(city);
    if (index >= 0) {
      this.data.city.Unlocs.splice(index, 1);
    }
  }
  addUnloc(events: MatAutocompleteSelectedEvent){
    let unloc : Unlocs = events.option.value;
    console.log(unloc);
    if( !this.duplicateObj(this.data.city.Unlocs, unloc.Id) ){
      
      this.data.city.Unlocs.push(unloc);
    }else{
      this.toastr.error("City already existed in this code.","Failed unloc update");
    }
  }
  private duplicateObj(array, id): boolean{
    for(let i =0; i< array.length;i++){
      if( array[i].Id === id ){
        console.log(array[i][0]);
        return true;
      }
    }
    return false;
  }
  displayFn(unloc: Unlocs){
    if(unloc) {
      console.log(unloc);
      return unloc.City;  
    }
  }
}
