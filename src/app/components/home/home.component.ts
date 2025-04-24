import { Component, inject, OnDestroy, OnInit, signal, WritableSignal,} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,TermtextPipe,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy{
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService);
  productList:WritableSignal<IProduct[]> = signal([]);
  wishlistProduct:WritableSignal<string[]> = signal([]);
  categoriesList:WritableSignal<ICategories[]> = signal([]);
  getAllProductsSub!:Subscription;
  getAllCategoriesSub!:Subscription;
  addProductToCartSub!:Subscription;
  addProductToWishlistSub!:Subscription;
  getLoggedUserWishlistSub!:Subscription;
  removeItemFromWishlistSub!:Subscription;
  text:string = '';

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    rtl:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    rtl:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  ngOnInit(): void {

    this.getAllCategoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesList.set(res.data);
      },
    })

    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productList.set(res.data);        
      },
    })

    this.getLoggedUserWishlistSub = this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        const newData = res.data.map((item:any)=>item._id) ;
        this.wishlistProduct.set(newData);
      }
    })
  }

  addToCart(id:string): void{
    this.addProductToCartSub = this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{        
        this._ToastrService.success(res.message,'FreshCart');
        this._CartService.cartNumber.set(res.numOfCartItems);
      },
    })
  }

  addToWishlist(id:string): void{
    this.addProductToWishlistSub = this._WishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        this.wishlistProduct.set(res.data)
        this._WishlistService.wishlistCount.set(res.data.length);
        this._ToastrService.success(res.message,'FreshCart');
      }
    })
  }

  removeItemFromWishlist(id:string): void{
    this.removeItemFromWishlistSub = this._WishlistService.removeProductFromWishlist(id).subscribe({
      next:(res)=>{
        this.wishlistProduct.set(res.data)
        this._WishlistService.wishlistCount.set(res.data.length);
        this._ToastrService.success(res.message,'FreshCart');
      }
    })
  }

  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe();
    this.getAllCategoriesSub?.unsubscribe();
    this.addProductToCartSub?.unsubscribe();
    this.addProductToWishlistSub?.unsubscribe();
    this.removeItemFromWishlistSub?.unsubscribe();
    this.getLoggedUserWishlistSub?.unsubscribe();
  }
}
