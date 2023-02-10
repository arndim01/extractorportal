import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { UserClaims } from '../../_model/user/user.model';
import { UserService } from '../../_services/user/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkflowService } from '../../_services/contract/workflow.service';
import { MainComponent } from '../main.component';

@Component({
  selector: 'app-contract-manager',
  templateUrl: './contract-manager.component.html',
  styleUrls: ['./contract-manager.component.css']
})
export class ContractManagerComponent implements OnInit {
  isLoading = false;
  constructor(public dialogRef: MatDialogRef<ContractManagerComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private contractService: WorkflowService, 
  public userClaims: UserClaims, private userService: UserService, private router: Router,
  private toastr: ToastrService, private workflowService: WorkflowService ) {}

  ngOnInit() {
    this.userService.getUserClaims().subscribe((response: any) => {
      this.userClaims = response;
    },
    (err: HttpErrorResponse) => {

    });
  }
  claim(){
    this.isLoading = true;
    console.log(this.data.contract);
    this.workflowService.claimWorkflow(this.data.contract).subscribe(
      (response: any) => {
        if(response.status == 200){
          console.log("success claimed");
        }
      },
      (err : HttpErrorResponse) => {

      }
    );

  }
  startRelease(){
    this.isLoading = true;
    
  }
  startConvert(){
    this.dialogRef.close();

    setTimeout(() =>{

      if( localStorage.getItem("CIK") && localStorage.getItem("CIK") != this.data.contract.Contract_hash ){
        var c = confirm("Remove previous work?");
        if(c == true ){
          localStorage.setItem("CIK", this.data.contract.Contract_hash);
          localStorage.removeItem("AID");
          localStorage.removeItem("CID");
          localStorage.removeItem("CIT");
          localStorage.removeItem("COM");
          localStorage.removeItem("RID");
          
          this.router.navigate(['/extractor']);
        }
      }else{
        localStorage.setItem("CIK", this.data.contract.Contract_hash);
        this.router.navigate(['/extractor']);
      }
    }, 300);
  }
  startAmd(){
    this.dialogRef.close();

    this.router.navigate(['/extractoramd']);


  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/loading', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
  onNoClick(): void{
    this.dialogRef.close();
  }

}
