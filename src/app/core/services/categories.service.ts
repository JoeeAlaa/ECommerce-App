import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envionment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor() { }
  private readonly _HttpClient = inject(HttpClient);

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${envionment.baseUrl}api/v1/categories`)
  }
  getSpecificCategories(id:string|null):Observable<any>{
    return this._HttpClient.get(`${envionment.baseUrl}api/v1/categories/${id}`)
  }
  getSubCategoryOnCategory(id:string|null):Observable<any>{
    return this._HttpClient.get(`${envionment.baseUrl}api/v1/categories/${id}/subcategories`)
  }
}
