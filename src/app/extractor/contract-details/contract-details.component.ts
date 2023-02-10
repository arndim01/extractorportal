import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ContractDetailsService } from '../../_services/contract/contract-details.service';
import { ContractDetails } from '../../_model/contract/contract-details.model';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit, OnDestroy {

  
  private eff:Date
  private exp: Date;
  @Input() contractDetails: ContractDetails;
  constructor(private router: Router, private contractDetailsService: ContractDetailsService, private toastr: ToastrService ) { 
    this.contractDetails = contractDetailsService.value;
  }
  ngOnInit() {
    
  }
  Save(){
    this.contractDetails.EffectiveDate = new Date(this.contractDetails.EffectiveDate).toLocaleDateString("MMddyyyy");
    this.contractDetails.ExpirationDate = new Date(this.contractDetails.ExpirationDate).toLocaleDateString("MMddyyyy");

    if( this.contractDetails.AmendmentId == "" || this.contractDetails.AmendmentId == null || this.contractDetails.AmendmentId == typeof undefined ){
      this.toastr.error("Amendment id cannot be empty", "Error filling");
      return;
    }
    if( this.contractDetails.ContractId == "" || this.contractDetails.ContractId == null || this.contractDetails.ContractId == typeof undefined){
      this.toastr.error("Contract id cannot be empty","Error filling");
      return;
    }
    if( this.convertDateToTimeStamp(this.contractDetails.EffectiveDate) >= this.convertDateToTimeStamp(this.contractDetails.ExpirationDate) ){
      this.toastr.error("Invalid Date Validity", "Error filling");
      return;
    }
    
    this.contractDetailsService.updateContractDetails(this.contractDetails).subscribe((response: any) =>{
      if( response.status ){
        this.toastr.success("Contract Details Updated","Successfully Update");

      }
    }, (err: HttpErrorResponse) => {

    })
  }
  private convertDateToTimeStamp(strDate: string){
    return (new Date(strDate).getTime());
  }
  ngOnDestroy(){
  }
}
