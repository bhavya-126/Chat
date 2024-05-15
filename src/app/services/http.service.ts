import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
// import { environment } from 'src/environments/environment';
import { urls } from '../url';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor() {}
  BASE_URL: string = urls.BASE_URL
  http: HttpClient = inject(HttpClient);
  logIn(data:{email:string, password:string}) {
    return this.http.post(this.BASE_URL + urls.LOGIN , data);
  }
  signIn(data){
    return this.http.post( this.BASE_URL + urls.REGISTER, data);
  }
  forgotPassword(email:string){
    return this.http.post( this.BASE_URL + urls.FORGOT_PASSWORD, {urldirect:"http://localhost:4200/ResetPassword", email});
  }
  changePassword(password:string, token:string){
    return this.http.post(this.BASE_URL + urls.CHANGE_PASSWORD, {password}, {headers:{Authorization: "Bearer " + token}})
  }
}
