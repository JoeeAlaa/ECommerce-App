import { signUpValidators } from './../../shared/validators/register.validators';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth.service';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  msgError:string = "";
  isLoading:boolean = false;
  loginSub!:Subscription;

  loginForm:FormGroup = this._FormBuilder.group({
    email: [null,signUpValidators.email],
    password: [null,signUpValidators.password],
  })


  loginSubmit():void{
    if(this.loginForm.valid){
      this.isLoading = true;
      this.loginSub =this._AuthService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          if(res.message == 'success'){
            this._ToastrService.success(res.message,'FreshCart')
            localStorage.setItem('userToken',res.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/home']);
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading = false;
          this.msgError = err.error.message;
        }
      })
      localStorage.setItem('userEmail',this.loginForm.get('email')?.value)
    }
    else{
      this.loginForm.setErrors({mismatch:true});
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}
