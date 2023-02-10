import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';
import { Surcharge } from '../../shared/model/surcharge.model';
import { FormBuilder, FormGroup } from '@angular/forms';
  import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { SurchargeService } from '../../shared/surcharges/surcharge.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rates-special-dialog',
  templateUrl: './rates-special-dialog.component.html',
  styleUrls: ['./rates-special-dialog.component.css']
})
export class RatesSpecialDialogComponent implements OnInit {

  filteredCode: Surcharge[] = [];
  conditionForm: FormGroup;
  isLoading = false;
  constructor(private toastr: ToastrService, private surchargeService: SurchargeService, private fb: FormBuilder, public dialogRef: MatDialogRef<RatesSpecialDialogComponent>,
  @Inject(MAT_DIALOG_DATA)public data:any) {

    console.log(data);

   }

  ngOnInit() {

    this.conditionForm = this.fb.group({
      surchargeInput: null
    });

    this.conditionForm
    .get('surchargeInput')
    .valueChanges
    .pipe(
      debounceTime(500),
      tap(() => this.isLoading = true),
      switchMap(value => this.surchargeService.search(value, 1)
      .pipe(
          finalize(() => this.isLoading = false)

        )
      )
    ).subscribe(surcharge => this.filteredCode = surcharge.json());
  }
  onNoClick(): void{
    this.dialogRef.close();
  }
  addSurcharge(events : MatAutocompleteSelectedEvent){
    let surcharge: Surcharge = events.option.value;
    if( !this.duplicateObj(this.data.pass[2], surcharge.Id)){
      if( this.data.pass[2] == null ) this.data.pass[2] = [];
       
      this.data.pass[2] = this.data.pass[2].concat([[surcharge.Id, surcharge.Name, surcharge.Code, true ]]);

      console.log(this.data.pass[2]);

    }else{
      this.toastr.error("Surcharge already applied.", "Failed surcharge update");
    }
  }
  private duplicateObj(array, id): boolean{
    if( array == null ) return false;
    for(let i =0; i< array.length;i++){
      if( array[i][0] === id ){
        console.log(array[i][0]);
        return true;
      }
    }
    return false;
  }
  displayFn(surcharge: Surcharge){
    if(surcharge) {
      console.log(surcharge);
      return ""; 
    }
  }
  removeSurcharge(surcharge: any){
    let index = this.data.pass[2].indexOf(surcharge);
    if( index >= 0 ){
      this.data.pass[2].splice(index, 1);
      this.createNewData();
    }
  }
  private createNewData(){
    let newData = this.data.pass[2];
    this.data.pass[2] = [];
    this.data.pass[2] = this.data.pass[2].concat(newData);
  }
  setSubjectTo(surcharge: any){
    console.log(surcharge);
    let index = this.data.pass[2].indexOf(surcharge);
    if( index >= 0){
      this.data.pass[2][index][3] = false;
      this.createNewData();
    }
  }
  setIncluded(surcharge: any){
    console.log(surcharge);
    let index = this.data.pass[2].indexOf(surcharge);
    if( index >= 0){
      this.data.pass[2][index][3] = true;
      this.createNewData();
    }
  }
}
