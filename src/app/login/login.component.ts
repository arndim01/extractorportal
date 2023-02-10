
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../_services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if(localStorage.getItem('userToken') ){
      this.router.navigate(['/main/workflow']);
    }
  }
  get f(){return this.loginForm.controls;}
  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.loading = true;
    this.userService.userAuthentication(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data: any) =>{
          if( data.auth_token != null && data.auth_token != '' && data.auth_token != 'undefined'  ){
            setTimeout(() => {
              localStorage.setItem('userToken', data.auth_token);
              localStorage.setItem("id", data.id);
              this.toastr.success("Welcome user", "Successful login");
              this.router.navigate([this.returnUrl]);
              this.submitted = false;
            }, 1000);
          }else{
            //Error Message
          }
        },
        (error : HttpErrorResponse) => {
          this.loading = false;
          this.submitted = false;
          //Error Message

          if( error.status == 400 ){
            this.toastr.error("Incorrect Username or Password", "Failed login");
          }
          else if(error.status == 0){
            this.toastr.error("Server connection failed", "Connection failed");
          }
        }
      );
  }
}
