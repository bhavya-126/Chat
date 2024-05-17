import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { urls } from '../url';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor() {}
  // BASE_URL: string = urls.BASE_URL
  http: HttpClient = inject(HttpClient);
  logIn(data:{email:string, password:string}) {
    return this.http.post(urls.BASE_URL + urls.LOGIN , data);
  }
  signIn(data){
    return this.http.post( urls.BASE_URL + urls.REGISTER, data);
  }
  forgotPassword(email:string){
    return this.http.post( urls.BASE_URL + urls.FORGOT_PASSWORD, {urldirect:environment.RESET_PASS_URL, email});
  }
  resetPassword(password:string, token:string){
    return this.http.post(urls.BASE_URL + urls.RESET_PASSWORD, {password}, {headers:{Authorization: `Bearer ${token}`}})
  }
  logout(token:string){
    return this.http.post(urls.BASE_URL + urls.LOGOUT, {} , {headers:{Authorization: `Bearer ${token}`}});
  }
  getProfile(token:string){
    return this.http.get(urls.BASE_URL + urls.PROFILE, {headers:{Authorization: `Bearer ${token}`}});
  }
  changePassword(data, token:string){
    return this.http.post( urls.BASE_URL + urls.CHANGE_PASSWORD, data, {headers:{Authorization: `Bearer ${token}`}})
  }
  getUser(token:string, name?:string){
    if(name)
    return this.http.get(urls.BASE_URL + urls.USERS + '?searchString=' + name, {headers:{Authorization:`Bearer ${token}`}} )
    return this.http.get(urls.BASE_URL + urls.USERS , {headers:{Authorization:`Bearer ${token}`}} )
  }
}
