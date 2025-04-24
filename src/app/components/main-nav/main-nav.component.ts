import { AfterViewInit, Component, computed, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, Signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/my-translation.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-main-nav',
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss'
})
export class MainNavComponent implements OnInit,OnDestroy{
  // @ViewChild('navbar') navbar!: ElementRef;
  // scrollTop=0
  // ngAfterViewInit() {
  //   this.scrollTop = this.navbar.nativeElement.offsetHeight;
  // }
  // @HostListener('window:scroll') onScroll() {
  //   if (scrollY > this.scrollTop) {
  //     this.navbar.nativeElement.classList.add('p-3');
  //     this.navbar.nativeElement.classList.add('position-fixed','z-3');
  //   } else {
  //     this.navbar.nativeElement.classList.remove('p-3');
  //     this.navbar.nativeElement.classList.remove('position-fixed','z-3');
  //   }
  // }
  private readonly _TranslationService = inject(TranslationService);
  readonly _TranslateService = inject(TranslateService);
  readonly _AuthService = inject(AuthService);
  readonly _CartService = inject(CartService);
  readonly _WishlistService = inject(WishlistService);
  countNumber:Signal<number> = computed( ()=> this._CartService.cartNumber());
  wishlistNumber:Signal<number> = computed( ()=> this._WishlistService.wishlistCount());
  getProductsCartSub!:Subscription;
  loggedUserName:WritableSignal<string> = signal('')

  ngOnInit(): void {
    if (localStorage.getItem('userName') !== null) {
      this.loggedUserName.set(localStorage.getItem('userName')!)
    }
    this.getProductsCartSub = this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        this._CartService.cartNumber.set(res.numOfCartItems) ;
      }
    })

    this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this._WishlistService.wishlistCount.set(res.count);
      }
    })
  }
  
  ngOnDestroy(): void {
    this.getProductsCartSub?.unsubscribe();
  }

  change(lang:string): void{
    this._TranslationService.changeLang(lang);
  }
}
