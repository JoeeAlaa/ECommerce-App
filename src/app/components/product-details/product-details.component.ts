import { IProduct } from './../../core/interfaces/iproduct';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit,OnDestroy{

  private readonly _ActivatedRoute= inject(ActivatedRoute);
  private readonly _ProductsService= inject(ProductsService);
  private readonly _CartService= inject(CartService);
  private readonly _ToastrService= inject(ToastrService);
  ActivatedRouteSub!:Subscription;
  getSpecificProductsSub!:Subscription;
  addProductToCartSub!:Subscription;
  datailsProduct:IProduct | null = null

  addToCart(id:string): void{
    this.addProductToCartSub = this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{        
        this._ToastrService.success(res.message,'FreshCart');
        this._CartService.cartNumber.set(res.numOfCartItems);
      },
    })
  }

  ngOnInit(): void {

    this.ActivatedRouteSub = this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let productId = p.get('id');

        this.getSpecificProductsSub = this._ProductsService.getSpecificProducts(productId).subscribe({
          next:(res)=>{
            this.datailsProduct = res.data;
          },
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.ActivatedRouteSub?.unsubscribe(); 
    this.getSpecificProductsSub?.unsubscribe(); 
    this.addProductToCartSub?.unsubscribe();
    this.addProductToCartSub?.unsubscribe();  
  }

  customOptionsDetails: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    autoplayTimeout:1000,
    slideTransition:'linear',
    dots: true,
    navSpeed: 400,
    navText: ['', ''],
    items:1,
    nav: false
  }
}
