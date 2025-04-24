import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { signUpValidators } from '../../shared/validators/register.validators';
import { confirmPassword } from '../../shared/utils/confirm-password';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  isloading:boolean = false;

  changePasswordForm:FormGroup = this._FormBuilder.group({
    currentPassword:[null,signUpValidators.password],
    password:[null,signUpValidators.password],
    rePassword:[null]
  },{validators:confirmPassword})


  changeSubmit(): void{
    if (this.changePasswordForm.valid) {
      this.isloading = true;
      this._AuthService.changePassword(this.changePasswordForm.value).subscribe({
        next:(res)=>{
          this.isloading = false;
          if (res.message == 'success') {
            this._ToastrService.success(res.message,'FreshCart')
            localStorage.setItem('userToken',res.token);
            this._Router.navigate(['/home']);
          }          
        },
        error:(err)=>{
          this.isloading = false;
        }
      })
    }
    else{
      this.changePasswordForm.markAllAsTouched();
      this.changePasswordForm.setErrors({mismatch:true});
    }
  }
}
