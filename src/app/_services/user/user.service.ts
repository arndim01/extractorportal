import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, ChangedPassword, UserClaims } from '../../_model/user/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
const rootUrl = environment.apiUrl;

@Injectable()
export class UserService {
  public userClaims: UserClaims;
  constructor(private http: HttpClient, private router: Router) { }
  registerUser(user: User){
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var requestHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(rootUrl + '/api/User/Register', body, {headers: requestHeader});
  }
  userAuthentication(userName, password){
    var requestHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
    return this.http.post(rootUrl + '/api/auth/login', JSON.stringify({userName,password}), {headers: requestHeader});
  }
  userLogout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
  getUserClaims(){
    return this.http.get(rootUrl + '/api/user/claims', {observe : 'response'});
  }
  getUserRoles(){
    return this.http.get(rootUrl + '/api/user/roles');
  }
}
