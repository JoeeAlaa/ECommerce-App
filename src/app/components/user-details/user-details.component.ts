import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-details',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit{

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);

  detailsForm:FormGroup = this._FormBuilder.group({
    name:[null],
    role:[null],
    email:[null]
  })

  ngOnInit(): void {
    if (localStorage.getItem('userName') !== null && localStorage.getItem('userRole') !== null) {
      
      this.detailsForm.get('name')?.patchValue(localStorage.getItem('userName'));
      this.detailsForm.get('role')?.patchValue(localStorage.getItem('userRole'));
      this.detailsForm.get('email')?.patchValue(localStorage.getItem('userEmail'));
    }
    this.detailsForm.get('name')?.disable();
    this.detailsForm.get('role')?.disable();
    this.detailsForm.get('email')?.disable();

  }
}
