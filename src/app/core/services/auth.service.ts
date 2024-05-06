import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = '';

  constructor() { }

  isAuth() { return this.token.length > 0; }

  login(value: any) : boolean {

    if (value.user === 'admin' && value.password === '123') {
      this.token = value.user + '@' + value.password  ;
      console.log(this.token);
      return true;
    }
    return false;
  }
}
