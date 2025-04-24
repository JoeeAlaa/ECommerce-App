import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { envionment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }
  private readonly _HttpClient = inject(HttpClient);
  cartNumber:WritableSignal<number> = signal(0);

  addProductToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${envionment.baseUrl}api/v1/cart`,
      {
        "productId": id
      }
    )
  }
  getProductsCart():Observable<any>{
    return this._HttpClient.get(`${envionment.baseUrl}api/v1/cart`,)
  }
  removeSpecificCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${envionment.baseUrl}api/v1/cart/${id}`)
  }
  UpdateCartProductQuantity(id:string , countNum:number):Observable<any>{
    return this._HttpClient.put(`${envionment.baseUrl}api/v1/cart/${id}`,
      {
        "count": countNum
      },
    )
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${envionment.baseUrl}api/v1/cart`)
  }
  
}
