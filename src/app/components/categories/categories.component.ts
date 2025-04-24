import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { ICategories } from '../../core/interfaces/icategories';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [RouterLink,SearchPipe,FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  private readonly _CategoriesService = inject(CategoriesService);
  categoriesList:WritableSignal<ICategories[]> = signal([]);
  getAllCategoriesSub!:Subscription;
  text:string = '';

  ngOnInit(): void {

    this.getAllCategoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesList.set(res.data);        
      },
    })
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSub?.unsubscribe();
  }
}
