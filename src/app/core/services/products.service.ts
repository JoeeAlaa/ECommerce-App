import { envionment } from './../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor() { }
  private readonly _HttpClient = inject(HttpClient);

  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${envionment.baseUrl}api/v1/products`)
  }
  getSpecificProducts(id:string|null):Observable<any>{
    return this._HttpClient.get(`${envionment.baseUrl}api/v1/products/${id}`)
  }
}
