import { Injectable } from '@angular/core';
import { ProgressHttp } from 'angular-progress-http';
import { RequestOptions, RequestMethod, Headers, ResponseContentType } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
const rootUrl = environment.apiUrl;
@Injectable()
export class ContractService {
  public static MAIN_URL = rootUrl + "/";
  private contractData: ContractDataModel;
  constructor(private http: ProgressHttp, private toastr : ToastrService) { }
  InitializeContractData(data: any){
    this.contractData = new ContractDataModel;


    if( localStorage.getItem("CID") ){
      this.contractData.contract_details = JSON.parse( localStorage.getItem("CID"));
    }else{
      this.contractData.contract_details =  data.ContractDetails.details[0];
      localStorage.setItem("CID", JSON.stringify( data.ContractDetails.details[0]));
    }
    
    if( localStorage.getItem("RID")){
      this.contractData.rates_details = JSON.parse( localStorage.getItem("RID"));
    }else{
      this.contractData.rates_details = data.RatesDetails.details;
      localStorage.setItem("RID", JSON.stringify(data.RatesDetails.details));
    }
    
    if( localStorage.getItem("COM")){
      this.contractData.commodity_details = JSON.parse(localStorage.getItem("COM"));
    }else{
      this.contractData.commodity_details = data.CommodityDetails.details;
      localStorage.setItem("COM", JSON.stringify( data.CommodityDetails.details));
    }
    
    if( localStorage.getItem("CIT")){
      this.contractData.city_details = JSON.parse( localStorage.getItem("CIT"));
    }else{
      this.contractData.city_details = data.CityDetails;
      localStorage.setItem("CIT", JSON.stringify(data.CityDetails));
    }
    
    if( localStorage.getItem("AID")){
      this.contractData.arbs_details = JSON.parse( localStorage.getItem("AID"));
    }else{
      this.contractData.arbs_details  = data.ArbsDetail.details;
      localStorage.setItem("AID", JSON.stringify(data.ArbsDetail.details));
    }
    this.contractData.key = localStorage.getItem("CIK");
  }
  getContractData(){
    return this.contractData;
  }
  private removeArbsDuplication(details: any){
    for(let i = 0;i < details.length; i ++){
      let b_rates = [];
      for(let ii = 0;ii < details[i][5].length; ii++){
        let dummy_rates = [];
        dummy_rates.push(  details[i][5][ii] );
        if( ii ==  details[i][5].length - 1 ){
          b_rates.push(dummy_rates[0]);
        }else{
          if(
            dummy_rates[0][0] == details[i][5][ii + 1][0]
            && dummy_rates[0][1] == details[i][5][ii + 1][1]
            && dummy_rates[0][2] == details[i][5][ii + 1][2]
            && dummy_rates[0][3] == details[i][5][ii + 1][3]
            && dummy_rates[0][4] == details[i][5][ii + 1][4]
            && dummy_rates[0][6] == details[i][5][ii + 1][6]
            && dummy_rates[0][7] == details[i][5][ii + 1][7]
            && dummy_rates[0][8] == details[i][5][ii + 1][8]
            && dummy_rates[0][9] == details[i][5][ii + 1][9]
            && dummy_rates[0][10] == details[i][5][ii + 1][10]
            && dummy_rates[0][11] == details[i][5][ii + 1][11]
            && dummy_rates[0][13] == details[i][5][ii + 1][13]
            && dummy_rates[0][14] == details[i][5][ii + 1][14]
          ){
            dummy_rates[0][5] = "0HAZ";
            dummy_rates[0][12] = "DRY";
            b_rates.push(dummy_rates[0]);
            ii++
          }else{
            b_rates.push(dummy_rates[0]);
          }
        }
      }
      if( b_rates.length > 0){
        details[i][5] = b_rates;
      }
    }
  }
  private removeDuplication(details: any){
    for(let i = 0;i < details.length; i ++){
      for(let ii = 0;ii < details[i][5].length; ii++){
        if( details[i][5][ii][4].length > 0 ){
          let b_rates = [];
          for(let iii = 0;iii < details[i][5][ii][4].length; iii++){
            let dummy_rates = [];
            dummy_rates.push(details[i][5][ii][4][iii]);
            if(iii == details[i][5][ii][4].length - 1 ){
              b_rates.push(dummy_rates[0]);
            }else{
              if( 
                dummy_rates[0][0] == details[i][5][ii][4][iii + 1][0] 
                && dummy_rates[0][1] == details[i][5][ii][4][iii + 1][1]
                && dummy_rates[0][2] == details[i][5][ii][4][iii + 1][2]
                && dummy_rates[0][3] == details[i][5][ii][4][iii + 1][3]
                && dummy_rates[0][4] == details[i][5][ii][4][iii + 1][4]
                && dummy_rates[0][6] == details[i][5][ii][4][iii + 1][6]
                && dummy_rates[0][7] == details[i][5][ii][4][iii + 1][7]
                && dummy_rates[0][8] == details[i][5][ii][4][iii + 1][8]
                && dummy_rates[0][9] == details[i][5][ii][4][iii + 1][9]
                && dummy_rates[0][10] == details[i][5][ii][4][iii + 1][10]
                && dummy_rates[0][11] == details[i][5][ii][4][iii + 1][11]
                && dummy_rates[0][13] == details[i][5][ii][4][iii + 1][13]
              ){
                dummy_rates[0][5] = "0HAZ";
                dummy_rates[0][12] = "DRY";
                b_rates.push(dummy_rates[0]);
                iii++;
              }else{
                b_rates.push(dummy_rates[0]);
              }
            }
          }

          if ( b_rates.length > 0 ){
            details[i][5][ii][4] = b_rates;
          }
        }
      }
    }
    return details;
  }
  validateCities(): boolean{
    let cityValid = true; 
    if(  this.contractData != null){
      let cities = this.contractData.city_details;
      cities.forEach(element => {
        console.log(element[1]);
        if( element[2].length == 0 ){
          console.log(element[1]);
          cityValid = false;
          return;
        }
      });
      if( !cityValid ){
        this.toastr.error("Please fill all missing cities","Failed upload");
      }
    }
    return cityValid;
  }

}

export class ContractDataModel{
  contract_details: any;
  rates_details: any;
  arbs_details: any;
  commodity_details: any;
  city_details: any;
  container_details: any;
  surcharge_details: any;
  key: string;
  constructor(){
    this.container_details = [];
    this.surcharge_details = [];
  }
}

