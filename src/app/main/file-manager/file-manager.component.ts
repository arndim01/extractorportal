import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProgressHttp } from 'angular-progress-http';
import { ToastrService } from 'ngx-toastr';
import { RequestOptions, Headers, RequestMethod } from '@angular/http';
import { environment } from '../../../environments/environment';
import { WorkflowService } from '../../_services/contract/workflow.service';
import { ContractUpload, ContractAssign } from '../../_model/contract/contract-upload.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
const rootUrl = environment.apiUrl;

export interface Carrier {
  value: number;
  viewValue: string;
}
export interface AmdType{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 100})),
      state('out', style({opacity: 0})),
      transition('* => void', [
        animate(300, style({opacity:0}))
      ])
    ])
  ]
})
export class FileManagerComponent implements OnInit {
  @Input() text = 'Upload';
  @Input() param = 'file';
  @Input() target = 'http://localhost:28013/api/upload/';
  @Input() accept = 'text/*';
  public startLoadFileService: Array<FileUploadModel> = [];
  public uploadContractModel: any;
  public successUpload = false;
  public isFileLoading = false;

  // FORM CONTROL
  contractForm: FormGroup;
  submitted = false;



  carriers: Carrier[] = [
    {value: 2, viewValue: 'One Line'},
    {value: 3, viewValue: 'CMA Line'},
  ];
  amdType: AmdType[] = [
    {value: 'CONV', viewValue: 'Conversion'},
    {value: 'AMDT', viewValue: 'Amendment'}
  ];
  public contractAssign: ContractAssign;
  constructor(public dialogRef: MatDialogRef<FileManagerComponent>, private formBuilder: FormBuilder,
  @Inject(MAT_DIALOG_DATA) public data: any, private workflowService: WorkflowService, private http: ProgressHttp, private toastr: ToastrService) { }
  ngOnInit() {
    this.contractAssign = new ContractAssign();
    this.contractForm = this.formBuilder.group({
      carrier: ['', Validators.required],
      amdtype: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      expirationDate: ['', Validators.required],
      contractId: ['', Validators.required],
      amdid: ['', Validators.required]
    });

  }
  onClick(){
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    this.startLoadFileService = [];
    this.successUpload = false;
    
    fileUpload.onchange = () =>{
      const file = fileUpload.files[0];
      // console.log(file);
      this.isFileLoading = true;
      this.uploadContractModel = null;
      this.startLoadFileService.push({data: file, state: 'in', funcName: 'Upload start...', url: rootUrl + '/api/file/upload/' , progress: 0, successMsg: null, failedMsg: null});
      this.uploadFile( this.startLoadFileService[0] );
      
    };
    fileUpload.click();
  }
  onNoClick(){
    this.dialogRef.close();
  }
  private uploadFile(file: FileUploadModel){
    const fd = new FormData();
    var headerOptions = new Headers({'Authorization' : 'Bearer ' + localStorage.getItem("userToken")});
  var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions});
  fd.append(this.param, file.data);
  file.successMsg = this.http
    .withUploadProgressListener(progress => {
      file.progress = progress.percentage / 2
      console.log(file.progress);
    })
    .withDownloadProgressListener(progress => { 
      file.progress = progress.percentage
      console.log(file.progress);
    })
    .post(file.url, fd, requestOptions)
    
    .subscribe((response) => {
      var jsonResult = response.json();


      if( response.status == 200 ){
        //let key = jsonResult.Name.split('_')[1];
        this.toastr.success("Contract successfully uploaded.","Success");
        file.funcName = "Upload completed..."
        this.successUpload = true;
        this.isFileLoading = false;
        this.uploadContractModel = jsonResult;



        
      (<HTMLInputElement>document.getElementById('fileUpload')).value = null;
      }else{
        this.toastr.error("Invalid contract uploaded.","Failed");
        this.isFileLoading = false;
      this.startLoadFileService = [];
      (<HTMLInputElement>document.getElementById('fileUpload')).value = null;
        //this.router.navigate(['/workflow']);
      }
    },error => {
      this.toastr.error("Server error. Please contact administrator.","Failed");
      (<HTMLInputElement>document.getElementById('fileUpload')).value = null;
      this.startLoadFileService = [];
      this.isFileLoading = false;
      console.log(error);
    });
    ;    

  }
  setStartWorkflow(){

    console.log(this.contractAssign);

  }
  
  get f(){return this.contractForm.controls;}
  onSubmit(){
    this.submitted = true;
    if(this.contractForm.invalid){
      return;
    }
    this.f.effectiveDate.setValue(new Date(this.f.effectiveDate.value).toLocaleDateString("MMddyyyy"));
    this.f.expirationDate.setValue(new Date(this.f.expirationDate.value).toLocaleDateString("MMddyyyy"));
    this.workflowService.assignContract(this.f.carrier.value, this.f.effectiveDate.value, this.f.expirationDate.value, 
      this.f.contractId.value, this.f.amdid.value, this.f.amdtype.value, this.uploadContractModel.sourceName)
        .subscribe(
          (response: any) => {
            
            console.log(response.body);
            if(response.status == 200){
              
              this.dialogRef.close();
            }
          },
          (err : HttpErrorResponse) => {

          }
        );
        
  }
}



export class FileUploadModel {
  data: any;
  state: string;
  url: string;
  funcName: string;
  progress: number;
  successMsg: any;
  failedMsg: any;
}                              