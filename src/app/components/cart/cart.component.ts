import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit,OnDestroy {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  cartDetails:WritableSignal<ICart> = signal({} as ICart);
  cartCheck!:any;
  getProductsCartSub!:Subscription;
  removeSpecificCartItemSub!:Subscription;
  UpdateCartProductQuantitySub!:Subscription;
  clearCartSub!:Subscription;

  ngOnInit(): void {
    this.getProductsCartSub = this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        this.cartCheck = res.numOfCartItems;
        this.cartDetails.set(res.data) ;       
      },
    })
  }

  removeItem(id:string): void{
    this.removeSpecificCartItemSub = this._CartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        this.cartDetails.set(res.data);
        this.cartCheck = res.numOfCartItems;
        this._CartService.cartNumber.set(res.numOfCartItems);
        this._ToastrService.success('This Item Is Remove','FreshCart')
      },
    })    
  }

  updateCount(id:string , count:number): void{
    if(count > 0){
      this.UpdateCartProductQuantitySub = this._CartService.UpdateCartProductQuantity(id,count).subscribe({
        next:(res)=>{
          this.cartDetails.set(res.data);
          this._ToastrService.success(res.status,'FreshCart')
        },
      })
    }
  }

  clearCart(): void{
    this.clearCartSub = this._CartService.clearCart().subscribe({
      next:(res)=>{
        if(res.message === 'success'){
          this.cartDetails.set({} as ICart);
          this.cartCheck = res.numOfCartItems;
          this._CartService.cartNumber.set(0);
          this._ToastrService.success('Cart is Empty Now','FreshCart')
        }
      },
    })
  }

  ngOnDestroy(): void {
    this.getProductsCartSub?.unsubscribe();
    this.removeSpecificCartItemSub?.unsubscribe();
    this.UpdateCartProductQuantitySub?.unsubscribe();
    this.clearCartSub?.unsubscribe();
  }
}
