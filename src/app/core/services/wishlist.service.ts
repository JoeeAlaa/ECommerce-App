import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { envionment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor() { }
  private readonly _HttpClient = inject(HttpClient);
  wishlistCount:WritableSignal<number> = signal(0);

  addProductToWishlist(id:string):Observable<any>{
    return this._HttpClient.post(`${envionment.baseUrl}api/v1/wishlist`,
      {
        "productId": id
      }
    )
  }
  removeProductFromWishlist(id:string):Observable<any>{
    return this._HttpClient.delete(`${envionment.baseUrl}api/v1/wishlist/${id}`)
  }
  getLoggedUserWishlist():Observable<any>{
    return this._HttpClient.get(`${envionment.baseUrl}api/v1/wishlist`)
  }
}
