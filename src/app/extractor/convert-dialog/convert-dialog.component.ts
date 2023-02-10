import { Component, OnInit, Inject } from '@angular/core';
import { RequestOptions, RequestMethod , Headers, ResponseContentType} from '@angular/http';
import { ProgressHttp } from 'angular-progress-http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { ContractService } from '../shared/contract.service';

@Component({
  selector: 'app-convert-dialog',
  templateUrl: './convert-dialog.component.html',
  styleUrls: ['./convert-dialog.component.css']
})
export class ConvertDialogComponent implements OnInit {
  public uploadProgress = 0;
  public downloadProgress = 0;
  public successUpload: boolean = false;
  public localUID:string = localStorage.getItem("CIK");
  constructor(private http: ProgressHttp, public dialogRef: MatDialogRef<ConvertDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { 


    }

  ngOnInit() {
  }
  StartUpload(){
    this.uploadProgress = 0;
    this.successUpload = false;
    this.checkDetails();
    var headerOptions = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
    });
    var requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions, responseType: ResponseContentType.ArrayBuffer });
    this.http
      .withUploadProgressListener(progress=> {
        this.uploadProgress = progress.percentage;
      })
      .post(  ContractService.MAIN_URL + 'api/file/uploadversion/', JSON.stringify(this.data.pass.contractData), requestOptions)
      
      .subscribe((response ) => {

        if( response.status == 200 ){
          this.toastr.success("Contract successfully uploaded.","Success");
          this.successUpload = true;
        }
      },error => {
        this.toastr.error("Failed upload. Please contract admin.","Failed");
        this.uploadProgress = 0;
      });
  }
  private checkDetails(){
   
    for(let i = 0;i < this.data.pass.contractData.rates_details.length; i ++){
      for(let ii = 0;ii < this.data.pass.contractData.rates_details[i][5].length; ii++){
        if( this.data.pass.contractData.rates_details[i][5][ii][3].length > 0 ){
          for(let iii = 0; iii < this.data.pass.contractData.rates_details[i][5][ii][3].length; iii++){
            if(this.data.pass.contractData.rates_details[i][5][ii][3][iii][1][2] != null ){
              if( this.data.pass.contractData.rates_details[i][5][ii][3][iii][1][2].length > 0 ){
                for(let iiii = 0; iiii < this.data.pass.contractData.rates_details[i][5][ii][3][iii][1][2].length; iiii++){
                  if( !this.existSurchargeDetails(this.data.pass.contractData.rates_details[i][5][ii][3][iii][1][2][iiii])){
                    this.data.pass.contractData.surcharge_details.push(this.data.pass.contractData.rates_details[i][5][ii][3][iii][1][2][iiii]);
                  }
                }
              }
            }
          }
        }
        
        console.log(this.data.pass.contractData.rates_details[i][5][ii][4].length);
        for(let iii = 0; iii < this.data.pass.contractData.rates_details[i][5][ii][4].length; iii++){
          
          this.updateContainerDetails(this.data.pass.contractData.rates_details[i][5][ii][4][iii][12], this.data.pass.contractData.rates_details[i][5][ii][4][iii][8], this.data.pass.contractData.rates_details[i][5][ii][4][iii][9], this.data.pass.contractData.rates_details[i][5][ii][4][iii][10], this.data.pass.contractData.rates_details[i][5][ii][4][iii][11] );
        }
      }
      if( this.data.pass.contractData.rates_details[i][7][2] != null){
        for(let ii = 0; ii <  this.data.pass.contractData.rates_details[i][7][2].length; ii++){
          if( !this.existSurchargeDetails(this.data.pass.contractData.rates_details[i][7][2][ii])){
            this.data.pass.contractData.surcharge_details.push(this.data.pass.contractData.rates_details[i][7][2][ii]);
          }
        }
      }

    }
  }
  private existSurchargeDetails(surcharge: any){
    for(let i =0; i< this.data.pass.contractData.surcharge_details.length;i++){
      if( this.data.pass.contractData.surcharge_details[i][0] === surcharge[0] ){
        return true;
      }
    }
    return false;
  }
  private updateContainerDetails(container: string, br_20: string, br_40: string, br_40h: string, br_45: string){
    
    let b20: any;
    let b40: any;
    let b40h: any;
    let b45: any;
    
    let cont_20: string;
    let cont_40: string;
    let cont_40h: string;
    let cont_45: string;

    cont_20 = "";
    cont_40 = "";
    cont_40h = "";
    cont_45 = "";

    if( br_20 != null ){
      b20 = br_20.split("/");
      if( b20.length  == 2 ){
        cont_20 = b20[0] + "_20";
      }
    }
    if( br_40 != null ){
      b40 = br_40.split("/");
      if( b40.length  == 2 ){
        cont_40 = b40[0] + "_40";
      }
    }
    if( br_40h != null ){
      b40h = br_40h.split("/");
      if( b40h.length  == 2 ){
        cont_40h = b40h[0] + "_40h";
      }
    }
    if( br_45 != null){
      b45 = br_45.split("/");
       
      if( b45.length  == 2 ){
        cont_45 = b45[0] + "_45";
      }
    }
    let converted_container = [container.toUpperCase(), cont_20.toUpperCase(), cont_40.toUpperCase(), cont_40h.toUpperCase(), cont_45.toUpperCase() ];
    let index = this.data.pass.contractData.container_details.indexOf(converted_container);
    if( converted_container.length > 0 ){
      
      if( !this.existContainer(converted_container) ){
        this.data.pass.contractData.container_details.push(converted_container);
      }
       
      
    }
    
  }
  private existContainer(cv: any){

    for(let i =0;i < this.data.pass.contractData.container_details.length; i++ ){
      if( this.data.pass.contractData.container_details[i][0] == cv[0]
        && this.data.pass.contractData.container_details[i][1] == cv[1]
        && this.data.pass.contractData.container_details[i][2] == cv[2]
        && this.data.pass.contractData.container_details[i][3] == cv[3]
        && this.data.pass.contractData.container_details[i][4] == cv[4]
      ){
        return true;
      }
    }
    return false;
  }
}
