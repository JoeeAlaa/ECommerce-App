import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { IBrandDetails } from '../../core/interfaces/ibranddetails';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-details',
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit,OnDestroy{

  brandDetails:WritableSignal<IBrandDetails | null> = signal(null);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _BrandsService = inject(BrandsService);
  ActivatedRouteSub!:Subscription;
  getSpecificBrandsSub!:Subscription;


  ngOnInit(): void {
    this.ActivatedRouteSub = this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let brandId = p.get('id')
        
        this.getSpecificBrandsSub = this._BrandsService.getSpecificBrands(brandId).subscribe({
          next:(res)=>{
            this.brandDetails.set(res.data)            
          }
        })

      }
    })
  }
  ngOnDestroy(): void {
    this.ActivatedRouteSub?.unsubscribe();
    this.getSpecificBrandsSub?.unsubscribe();
  }

}
