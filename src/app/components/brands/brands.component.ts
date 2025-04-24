import { Subscription } from 'rxjs';
import { BrandsService } from './../../core/services/brands.service';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { IBrands } from '../../core/interfaces/ibrands';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brands',
  imports: [RouterLink,SearchPipe,FormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy{

  private readonly _BrandsService = inject(BrandsService);
  getAllBrandsSub!:Subscription;
  brandsList:WritableSignal<IBrands> = signal({} as IBrands);
  text:string = '';

  ngOnInit(): void {
    this.getAllBrandsSub = this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brandsList().data = res.data;        
      }
    })
  }
  ngOnDestroy(): void {
    this.getAllBrandsSub?.unsubscribe();
  }
}
