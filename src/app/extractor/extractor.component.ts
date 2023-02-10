import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressHttp } from 'angular-progress-http';
import { trigger, style, transition, state, animate } from '@angular/animations';
import { RequestOptions, RequestMethod, Headers } from '@angular/http';

import { Contract } from './shared/contract.model';
import { ContractService } from './shared/contract.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { ConvertDialogComponent } from './convert-dialog/convert-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ContractDetailsService } from '../_services/contract/contract-details.service';



@Component({
  selector: 'app-extractor',
  templateUrl: './extractor.component.html',
  styleUrls: ['./extractor.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 100})),
      state('out', style({opacity: 0})),
      transition('* => void', [
        animate(300, style({opacity:0}))
      ])
    ])
  ],
  providers: [ContractService]
})
export class ExtractorComponent implements OnInit, OnDestroy {
  private uploadModel: FileUploadModel;
  private contract: Contract;
  private contract_key = localStorage.getItem("CIK");
  public loadContract = false;
  public routeStatus = false;
  public returnUrl: string;
  navigationSubscription;

  //ROUTER TAB
  routeLinks: any[];
  activeLinkIndex = -1;
  constructor(
    private contractDetailsService: ContractDetailsService,
    private toastr : ToastrService, 
    public dialog: MatDialog, 
    private http: ProgressHttp, 
    private contractService: ContractService, 
    public route: ActivatedRoute,
    private router: Router) {
    this.routeLinks = [
      { 
        label: 'overview',
        path: '/extractor/start-tool',
        index: 0
      },
      {
        label: 'contract-info',
        path: '/extractor/contract',
        index: 1
      },
      {
        label: 'commodity',
        path: '/extractor/commodity',
        index: 2
      },
      {
        label: 'city',
        path: '/extractor/city',
        index: 3
      },
      {
        label: 'rates',
        path : '/extractor/rates',
        index: 4
      },
      {
        label: 'arbs',
        path : '/extractor/arbs',
        index: 5
      },
      {
        label: 'freetime',
        path : '/extractor/freetime',
        index: 6
      },
      {
        label: 'trade',
        path: '/extractor/trade',
        index: 7
      }
    ];
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/extractor/start-tool';
    
    this.uploadModel = new FileUploadModel;
    this.uploadModel.data = {hashkey: this.contract_key};
    this.uploadModel.state = 'in';
    this.uploadModel.url =  ContractService.MAIN_URL + 'api/workflow/getworkflows/';
    this.uploadModel.progress =  0;
    this.uploadModel.description = "Retrieving workflow data...";
    this.uploadModel.requestOptions = new RequestOptions(
      {  
        method : RequestMethod.Get, 
        headers: new Headers({'Content-Type': 'application/json'}) 
      } );
    this.contractDetailsService.initializeDetails().subscribe((response: any) => {
      if(response.status == 200){
        this.contractDetailsService.value = response.body;
        this.getworkflow(this.uploadModel);
      }
    },(err: HttpErrorResponse) => {
      console.log(err.status);
    })


  }
  initialiseInvites() {
  }
  ngOnInit() {
  }
  routeTab(){
    console.log("route");
  }
  ngOnDestroy(){
    if( this.navigationSubscription){
      this.navigationSubscription.unsubscribe();
      
     
    }
  }
  clearCache(){
    localStorage.removeItem("CIK");
    localStorage.removeItem("AID");
    localStorage.removeItem("CID");
    localStorage.removeItem("CIT");
    localStorage.removeItem("COM");
    localStorage.removeItem("RID");
  }
  goToWorkflow(){
    this.router.navigate(['/main/workflow']);
  }
  New(){
    var c = confirm("All updates on this contract will be deleted");
    if(c == true ){
      this.clearCache();
      this.router.navigate(['/main/workflow']);
    }
  }
  Upload(){
    //this.toastr.show("Please wait...","Waiting...");
    //this.contractService.uploadData();
    let dialogRef = this.dialog.open(ConvertDialogComponent, {
      minHeight: '275px',
      maxHeight: '300px',
      width: '500px',
      data: { pass: this.contractService },
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  private getworkflow(fileModel: FileUploadModel){
    var headerOptions = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
    });
    var requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions });
    let key = fileModel.data.hashkey;

    this.http.get(fileModel.url + key, requestOptions)
      .subscribe((response) => {
        if( response.ok ){
          this.getworkflow_json();
          //this.donwload_data_helper();
        }
      },(err : HttpErrorResponse) => {
        if(err.status != 401){
          alert("The file you are accessing is already deleted. Upload a new one.")
          this.clearCache();  
        }
        this.router.navigate(['/main/workflow']);
      });
  }
  private getworkflow_json(){
  var headerOptions = new Headers({'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
  });
  var requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions });
    this.http
      .withDownloadProgressListener( progress => {
        this.uploadModel.progress = progress.percentage;
      })  
      .get( ContractService.MAIN_URL + 'api/file/getworkflowfile/' + this.contract_key, requestOptions )
      .subscribe((response) => {
        this.contractService.InitializeContractData(response.json());
        setTimeout(() => {
          this.loadContract = true;

          

          this.router.navigate([this.returnUrl]);
        }, 2000);
          
      },(err : HttpErrorResponse) => {
        if(err.status != 401){
          alert("The file you are accessing is already deleted. Upload a new one.")
          this.clearCache();  
        }
        this.router.navigate(['/main/workflow']);
      });
  }
  onLinkClick(event: MatTabChangeEvent){
    let tabTitle = event.tab.textLabel;
    let routelink = this.routeLinks.find(n => n.label == tabTitle);
    
    this.router.navigate([routelink.path]);
  }
}

export class FileUploadModel{
  data: any;
  state: string;
  url: string;
  progress: number;
  description: string;
  requestOptions: RequestOptions;
}