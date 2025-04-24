import { AuthService } from './../../core/services/auth.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { signUpValidators } from '../../shared/validators/register.validators';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent implements OnDestroy{
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  step:any = 1;
  isLoading:boolean = false;
  msgError:string = '';
  msgSuccess:string = '';
  setEmailVerifySub!:Subscription;
  setCodeVerifySub!:Subscription;
  setResetPassSub!:Subscription;


  verifyEmail:FormGroup = new FormGroup({
    email:new FormControl(null,signUpValidators.email)
  })
  verifyResetCode:FormGroup = new FormGroup({
    resetCode:new FormControl(null,signUpValidators.resetCode)
  })
  resetPassword:FormGroup = new FormGroup({
    email:new FormControl(null,signUpValidators.email),
    newPassword:new FormControl(null,signUpValidators.password),
  })

  verifyEmailSubmit():void{
    if(this.verifyEmail.valid){
      let emailValue = this.verifyEmail.get('email')?.value;
      this.resetPassword.get('email')?.patchValue(emailValue);
      this.isLoading = true;
      this.setEmailVerifySub = this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          if (res.statusMsg === 'success') {
            this.msgSuccess = res.message;
            this.step = 2;
            this.msgSuccess = '';
            this.msgError = '';
          }
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false
          this.msgError = err.error.message
        }
      })

    }
    else{
      this.verifyEmail.markAllAsTouched();
    }
  }

  verifyCodeSubmit():void{
    if(this.verifyResetCode.valid){

      this.isLoading = true
      this.setCodeVerifySub = this._AuthService.setCodeVerify(this.verifyResetCode.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          if (res.status === 'Success') {
            this.msgSuccess = res.status;
            this.step = 3;
            this.msgSuccess = '';
            this.msgError = '';
          }
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false
          this.msgError = err.error.message
        }
      })

    }
    else{
      this.verifyResetCode.markAllAsTouched();
    }
  }

  resetPasswordSubmit():void{
    if(this.resetPassword.valid){

      this.isLoading = true
      this.setResetPassSub =this._AuthService.setResetPass(this.resetPassword.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          if (res.statusMsg !== 'fail') {
            this.msgSuccess = 'Success';
            setInterval(() => {
              localStorage.setItem('userToken',res.token);
              this._AuthService.saveUserData();
              this._Router.navigate(['/home'])       
            }, 2000);
          }
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false
          this.msgError = err.error.message
        }
      })

    }
    else{
      this.resetPassword.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.setEmailVerifySub?.unsubscribe();
    this.setCodeVerifySub?.unsubscribe();
    this.setResetPassSub?.unsubscribe();
  }
}
