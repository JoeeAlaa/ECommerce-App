import { signUpValidators } from './../../shared/validators/register.validators';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth.service';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { confirmPassword } from '../../shared/utils/confirm-password';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  msgError:string = "";
  isLoading:boolean = false;
  registerSub!:Subscription;

  registerForm:FormGroup = this._FormBuilder.group({
    name: [null,signUpValidators.name],
    email: [null,signUpValidators.email],
    password: [null,signUpValidators.password],
    rePassword: [null],
    phone: [null,signUpValidators.phone]
  },{validators: confirmPassword})


  registerSubmit():void{
    if(this.registerForm.valid){
      this.isLoading = true;
      this.registerSub = this._AuthService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          if(res.message == 'success'){
            this._ToastrService.success(res.message,'FreshCart')
            this._Router.navigate(['/login'])
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading = false;
          this.msgError = err.error.message;
          console.log(err);
        }
      })
      
    }
    else{
      this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe()
  }

}
