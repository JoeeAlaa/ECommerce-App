import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ISubcategories } from '../../core/interfaces/isubcategories';
import { ICategories } from '../../core/interfaces/icategories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit,OnDestroy{

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);
  subCategories:WritableSignal<ISubcategories[] | null> = signal(null);
  categoriesList:WritableSignal<ICategories> = signal({} as ICategories);
  ActivatedRouteSub!:Subscription;
  getSubCategoryOnCategorySub!:Subscription;
  getSpecificCategoriesSub!:Subscription;

  ngOnInit(): void {
    this.ActivatedRouteSub = this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let categoryId = p.get('id');

        this.getSubCategoryOnCategorySub = this._CategoriesService.getSubCategoryOnCategory(categoryId).subscribe({
          next:(res)=>{
            this.subCategories.set(res.data)
          }
        })

        this.getSpecificCategoriesSub = this._CategoriesService.getSpecificCategories(categoryId).subscribe({
          next:(res)=>{
            this.categoriesList.set(res.data)
          }
        })
        
      }
    })
  }
  ngOnDestroy(): void {
    this.ActivatedRouteSub?.unsubscribe();
    this.getSubCategoryOnCategorySub?.unsubscribe();
    this.getSpecificCategoriesSub?.unsubscribe();
  }
}
