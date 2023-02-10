import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserClaims, ChangedPassword } from '../../_model/user/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  oldPass: string;
  newPass: string;
  confirmPass: string;
  constructor(private userService: UserService, public userClaims: UserClaims, private toastr: ToastrService, private pass: ChangedPassword) { 

  }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
      //console.log(this.userClaims.Email);
    }, 
    (err : HttpErrorResponse) => {
    });
  }
  sendUpdate(){
    if( this.oldPass == undefined || this.oldPass == '' || this.oldPass == null  ){
      this.toastr.error("Old password cannot be blank.","Error Input");
      return;
    }else{
      if( this.oldPass.trim() == '' ){
        this.toastr.error("Old password cannot be blank.","Error Input");
        return;
      }
    }

    if( this.newPass == undefined || this.newPass == '' || this.newPass == null  ){
      this.toastr.error("New password cannot be blank.","Error Input");
      return;
    }else{
      if( this.newPass.trim() == '' ){
        this.toastr.error("New password cannot be blank.","Error Input");
        return;
      }
    }
    if( this.newPass !== this.confirmPass ){
      this.toastr.error("New password do not match. Try again", "Password not match");
      return;
    }

    this.pass.OldPass = this.oldPass;
    this.pass.NewPass = this.newPass;

    
  }

}

