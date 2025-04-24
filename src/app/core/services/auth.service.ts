import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { envionment } from '../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  userData:any = null;

  signUp(data:object):Observable<any>{
    return this._HttpClient.post(`${envionment.baseUrl}api/v1/auth/signup`,data)
  }
  signIn(data:object):Observable<any>{
    return this._HttpClient.post(`${envionment.baseUrl}api/v1/auth/signin`,data)
  }
  saveUserData():void{
    if(localStorage.getItem('userToken') !== null){
      this.userData = jwtDecode( localStorage.getItem('userToken')!);              
      localStorage.setItem('userId',this.userData.id);      
      localStorage.setItem('userName',this.userData.name);      
      localStorage.setItem('userRole',this.userData.role);      
    }  
  }
  signOut():void{
    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/login']);
  }

  setEmailVerify(data:object):Observable<any>{
    return this._HttpClient.post(`${envionment.baseUrl}api/v1/auth/forgotPasswords`,data)
  }
  setCodeVerify(data:object):Observable<any>{
    return this._HttpClient.post(`${envionment.baseUrl}api/v1/auth/verifyResetCode`,data)
  }
  setResetPass(data:object):Observable<any>{
    return this._HttpClient.put(`${envionment.baseUrl}api/v1/auth/resetPassword`,data)
  }

  changePassword(data:object):Observable<any>{
    return this._HttpClient.put(`${envionment.baseUrl}api/v1/users/changeMyPassword`,data)
  }

}  

