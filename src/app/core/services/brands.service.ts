import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envionment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  constructor() { }
  private readonly _HttpClient = inject(HttpClient);

  getAllBrands():Observable<any>{
    return this._HttpClient.get(`${envionment.baseUrl}api/v1/brands`)
  }
  getSpecificBrands(id:string | null):Observable<any>{
    return this._HttpClient.get(`${envionment.baseUrl}api/v1/brands/${id}`)
  }
}
