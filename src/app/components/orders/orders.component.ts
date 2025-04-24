import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { signUpValidators } from '../../shared/validators/register.validators';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-orders',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit,OnDestroy {

  private readonly _ActivatedRoute= inject(ActivatedRoute);
  private readonly _OrdersService= inject(OrdersService);
  private readonly _AuthService= inject(AuthService);
  cartId:string|null = '';
  isLoading:boolean = false;
  msgSuccess:boolean = false;
  msgError:string = '';
  ActivatedRouteSub!:Subscription;
  checkOutSub!:Subscription;

  orders:FormGroup = new FormGroup({
    details: new FormControl(null,signUpValidators.details),
    phone: new FormControl(null,signUpValidators.phone),
    city:new FormControl(null,signUpValidators.details),
  })

  ordersSubmit(): void{
    if (this.orders.valid) {
      this.isLoading = true;
      this.checkOutSub = this._OrdersService.checkOut(this.cartId,this.orders.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          if (res.status === 'success') {
            this.msgSuccess = true;
            window.open(res.session.url);              
          }          
        },
        error:(err)=>{
          this.isLoading = false;
          this.msgError = err.error.message
        }
      })
    }
    else{
      this.orders.markAllAsTouched()
    }
  }

  ngOnInit(): void {
    this.ActivatedRouteSub = this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId = param.get('id');
      }
    })
  }

  ngOnDestroy(): void {
    this.ActivatedRouteSub?.unsubscribe();
    this.checkOutSub?.unsubscribe();
  }
}
