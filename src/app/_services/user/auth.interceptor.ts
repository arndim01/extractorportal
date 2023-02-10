import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent,  HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from './user.service';
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private router: Router, private userService: UserService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        if( req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

            if( localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != '' && localStorage.getItem('userToken').trim() != ''){
                //console.log("jwt intercepter");
                let authToken = localStorage.getItem('userToken');
                // req.headers.append('Content-Type', 'application/json');
                // req.headers.append('Authorization', `Bearer ${authToken}`);
                const clonedreq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
                });
                console.log(clonedreq);
                return next.handle(clonedreq)
                .do(
                    succ => {

                        console.log("jwt");

                    },
                    err => {
                        //debugger;
                        if ( err.status == 401){
                            this.userService.userLogout();
                        }
                        if (err.status == 0){
                            this.userService.userLogout();
                        }
                    }
                );
            }else{
                this.userService.userLogout();
            }
    }
}