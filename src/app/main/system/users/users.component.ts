import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from '../../../_services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../_model/user/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['username', 'firstName', 'lastName',  'email', 'roles', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  user: User;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.resetForm();
    
  }
  resetForm(form?: NgForm){
    if( form != null)
    form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
  }
  onSubmit(form: NgForm){
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if( data.Succeeded == true ){
          this.resetForm(form);
        }
      });
  }

}
