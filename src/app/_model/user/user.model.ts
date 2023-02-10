import { Injectable } from "@angular/core";

export class User {
    UserName: string;
    Password: string;
    Email: string;
    FirstName: string;
    LastName: string;
}
export class UserClaims{
    firstName: string;
    lastName: string;
    value: string;
    id: string;
    userName: string;
    userId: string;
    email: string;
}
export class UserRoles{
    value: string;
    date: Date;
}

export class ChangedPassword{
    OldPass: string;
    NewPass: string;
}
  