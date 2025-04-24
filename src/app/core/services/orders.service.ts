import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envionment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor() { }

  private readonly _HttpClient = inject(HttpClient);
  myHeaders:any = {token: localStorage.getItem('userToken')};

  checkOut(id:string | null,shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${envionment.baseUrl}api/v1/orders/checkout-session/${id}?url=${envionment.urlServer}`,
      {
        "shippingAddress":shippingDetails
      },
      {
        headers:this.myHeaders
      }
    )
  }
  getUserOrders(id:string|null):Observable<any>{
    return this._HttpClient.get(`${envionment.baseUrl}api/v1/orders/user/${id}`)
  }
}
