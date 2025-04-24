import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit,OnDestroy{

  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService); 
  productList:WritableSignal<IProduct[]> = signal([]);
  wishlistProduct:WritableSignal<string[]> = signal([]);
  getLoggedUserWishlistSub!:Subscription;
  addProductToCartSub!:Subscription;
  removeProductFromWishlistSub!:Subscription;
  wishlistCheck!:any

  addToCart(id:string): void{
    this.addProductToCartSub = this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{        
        this._CartService.cartNumber.set(res.numOfCartItems);
        this._ToastrService.success(res.message,'FreshCart');
      },
    })
  }

  removeItem(id:string): void{
    this.removeProductFromWishlistSub = this._WishlistService.removeProductFromWishlist(id).subscribe({
      next:(res)=>{
        this.wishlistProduct.set(res.data);
        this.wishlistCheck = res.data.length;
        this._WishlistService.wishlistCount.set(res.data.length);
        this._ToastrService.success(res.message,'FreshCart');
        const removeProduct = this.productList().filter((item:any)=>this.wishlistProduct().includes(item._id))
        this.productList.set(removeProduct);
      }
    })
  }

  ngOnInit(): void {
    this.getLoggedUserWishlistSub = this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.productList.set(res.data);
        this.wishlistCheck = res.count ;       
        const newData = res.data.map((item:any)=>item._id) ;
        this.wishlistProduct.set(newData);
        this._WishlistService.wishlistCount.set(res.count);
      }
    })
  }

  ngOnDestroy(): void {
    this.getLoggedUserWishlistSub?.unsubscribe();
    this.addProductToCartSub?.unsubscribe();
    this.removeProductFromWishlistSub?.unsubscribe();
  }
}
