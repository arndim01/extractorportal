import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatPaginator, MatTableDataSource, MatTab, MatCheckboxChange } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, share } from 'rxjs/operators';
import { SurchargeService } from 'src/app/_services/contract/surcharge-service' ;
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NotesService } from 'src/app/_services/contract/notes.service';
import { SystemService } from 'src/app/_services/system/system.service';

@Component({
  selector: 'app-notes-direct',
  templateUrl: './notes-direct.component.html',
  styleUrls: ['./notes-direct.component.css']
})
export class NotesDirectComponent implements OnInit {
  filteredCode: any;
  conditionForm: FormGroup;
  isLoading = false;
  themeColor= "primary";
  BgThemeColor="primary"
  appType = "included";
  pickedSurcharge :any ;
  isSurchargePicked = true;
  
  
  //ASYNC
  mainValue$ : Observable<any>;
  systemValue$ : Observable<any>;

  //TEST

  //TABLE
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['surcharge', 'ship20', 'ship40',  'ship40hc', 'ship45', 'ship45hc', 'container', 'effective', 'expiration', 'currency', 'basis', 'action'];
  @ViewChild(MatPaginator) paginator : MatPaginator; 
  containerDefault = "DC";
  currencyDefault = "USD";
  basisDefault = "PC";

  //SURCHARGE ENTRY
  rallvalue = "";
  r20value = "";
  r40value = "";
  r40hvalue = "";
  r45value = "";
  r45hvalue = "";
  effSurcharge = "";
  expSurcharge = "";
  container = "";
  currency = "";
  basis = "";
  //CHECKBOX
  rall = false;
  r20 = false;
  r40 = false;
  r40h = false;
  r45 = false;
  r45h = false;



  constructor(public dialogRef: MatDialogRef<NotesDirectComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, 
  private surchargeService: SurchargeService, private toastr: ToastrService, 
  private notesService: NotesService, private systemService: SystemService ) {
    this.mainValue$ = notesService.getNotesMainValue(data.rates.HashValue).pipe(share()).delay(500);
    this.systemValue$ = systemService.getTemplateValues().pipe(share()).delay(500);
    this.displaySurchargeTable();


  }
  ngOnInit() {


    this.container = this.containerDefault;
    this.currency = this.currencyDefault;
    this.basis = this.basisDefault;


    this.conditionForm = this.fb.group({
      surchargeInput: null  
    });

    this.conditionForm.get('surchargeInput')
    .valueChanges
    .pipe(
      debounceTime(500),
      tap(() => this.isLoading = true),
      switchMap(value => this.surchargeService.search(value, 1)
        .pipe(
          finalize(() => this.isLoading = false)
        )
      )
    ).subscribe(surcharge => this.filteredCode = surcharge);
  }
  onNoClick(): void{
    console.log(this.data.rates.ResultValue.effectiveDate);

    if( this.data.rates.ResultValue.effectiveDate != null ){
      this.data.rates.ResultValue.effectiveDate = new Date(this.data.rates.ResultValue.effectiveDate).toLocaleDateString("MMddyyyy");
    }
    if( this.data.rates.ResultValue.expirationDate != null){
      this.data.rates.ResultValue.expirationDate = new Date(this.data.rates.ResultValue.expirationDate).toLocaleDateString("MMddyyyy");
    }

    this.dialogRef.close();
  }
  displaySurchargeTable(){
    this.dataSource = new MatTableDataSource(this.data.rates.ResultValue.surchargeOvs);
    this.dataSource.paginator = this.paginator;
  }
  applySurcharge(){
    console.log(this.data.rates);
    console.log(this.container);
    if( this.pickedSurcharge != null && !this.isSurchargePicked){
      console.log("picked");
      this.isSurchargePicked = true;
      if( !this.duplicateObj(this.data.rates.ResultValue.surchargeOvs, this.pickedSurcharge.id )){
        if( this.data.rates.ResultValue.surchargeOvs == null ) this.data.rates.ResultValue.surchargeOvs = [];
        if(this.appType == 'included'){

          this.data.rates.ResultValue.surchargeOvs = this.data.rates.ResultValue.surchargeOvs.concat([[this.pickedSurcharge.id, this.pickedSurcharge.code, 'included', "N/A","N/A","N/A","N/A","N/A","ALL","N/A","N/A","USD","PC" ]]);

        }else if(this.appType == 'subject'){

          this.data.rates.ResultValue.surchargeOvs = this.data.rates.ResultValue.surchargeOvs.concat([[this.pickedSurcharge.id, this.pickedSurcharge.code, 'subject', "N/A","N/A","N/A","N/A","N/A","ALL","N/A","N/A","USD","PC" ]]);

        }else if(this.appType == 'fixed'){
          let eff = "", exp = "";

          if(this.effSurcharge != "")
          eff = new Date(this.effSurcharge).toLocaleDateString("MMddyyyy");
          if(this.expSurcharge != "")
          exp = new Date(this.expSurcharge).toLocaleDateString("MMddyyyy");

          if( this.rall ){
            this.data.rates.ResultValue.surchargeOvs = this.data.rates.ResultValue.surchargeOvs.concat([[this.pickedSurcharge.id, this.pickedSurcharge.code, 'fixed', this.rallvalue, this.rallvalue, this.rallvalue, this.rallvalue, this.rallvalue, this.container, eff, exp, this.currency, this.basis]])
          }else{
            this.data.rates.ResultValue.surchargeOvs = this.data.rates.ResultValue.surchargeOvs.concat([[this.pickedSurcharge.id, this.pickedSurcharge.code, 'fixed', this.r20value, this.r40value, this.r40hvalue, this.r45value, this.r45hvalue, this.container, eff, exp, this.currency, this.basis]])
          }

          this.rallvalue = "";
          this.r20value = "";
          this.r40value = "";
          this.r40hvalue = "";
          this.r45value = "";
          this.r45hvalue = "";
          this.effSurcharge = "";
          this.expSurcharge = "";
          this.container = this.containerDefault;
          this.currency = this.currencyDefault;
          this.basis = this.basisDefault;
        }else{
          //ERROR MESSAGE
        }
        this.pickedSurcharge = null;
        this.displaySurchargeTable();
      }else{
        //ERROR MESSAGE
      }


    }

  }
  isSelectAllRate($event: MatCheckboxChange){
    console.log($event);
    if($event.checked ){

        this.r20 = false;
        this.r40 = false;
        this.r40h = false;
        this.r45 = false;
        this.r45h = false; 

        this.container = this.containerDefault;
        this.currency = this.currencyDefault;
        this.basis = this.basisDefault;
    }
  }
  addSurcharge(events : MatAutocompleteSelectedEvent){
    let surcharge: any = events.option.value;
    this.pickedSurcharge = surcharge;
    this.isSurchargePicked = false;
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
  displayFn(surcharge: any){
    if(surcharge) {
      console.log(surcharge);
      return ""; 
    }
  }
  removeSurcharge(surcharge: any){
    let index = this.data.rates.ResultValue.surchargeOvs.indexOf(surcharge);
    if( index >= 0 ){
      this.data.rates.ResultValue.surchargeOvs.splice(index, 1);
      this.createNewData();
      this.displaySurchargeTable();
      if(this.data.rates.ResultValue.surchargeOvs.length == 0) this.data.rates.ResultValue.surchargeOvs = null;
    }
  }
  private createNewData(){
    let newData = this.data.rates.ResultValue.surchargeOvs;
    this.data.rates.ResultValue.surchargeOvs = [];
    this.data.rates.ResultValue.surchargeOvs = this.data.rates.ResultValue.surchargeOvs.concat(newData);
  }
  // setSubjectTo(surcharge: any){
  //   console.log(surcharge);
  //   let index = this.data.rates.ResultValue.surchargeOvs.indexOf(surcharge);
  //   if( index >= 0){
  //     this.data.rates.ResultValue.surchargeOvs[index][3] = false;
  //     this.createNewData();
  //   }
  // }
  // setIncluded(surcharge: any){
  //   console.log(surcharge);
  //   let index = this.data.rates.ResultValue.surchargeOvs.indexOf(surcharge);
  //   if( index >= 0){
  //     this.data.rates.ResultValue.surchargeOvs[index][3] = true;
  //     this.createNewData();
  //   }
  // }
}
