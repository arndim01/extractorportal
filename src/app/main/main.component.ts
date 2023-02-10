import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserClaims } from '../_model/user/user.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  navTooltipPosition = "right";
  constructor( private userService: UserService, public userClaims: UserClaims, private actr: ActivatedRoute) {
    this.actr.data.pipe(map(data => data.cres)).subscribe((res) => {
      console.log(res.body);
      this.userClaims = res.body;
    });
  }


  ngOnInit() {
    //this.startLoading();
    // this.userService.getUserClaims().subscribe((data: any) => {
    //   this.userClaims = data.body;
    //   //console.log(this.userClaims);
    // }, 
    // (err : HttpErrorResponse) => {
    // });
    // console.log("First Loaded");
  }
  logout(){
    this.userService.userLogout();
  }
}
