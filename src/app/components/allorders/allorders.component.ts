import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';
import { IOrders } from '../../core/interfaces/iorders';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit,OnDestroy{
  private readonly _OrdersService = inject(OrdersService);
  getUserOrdersSub!:Subscription;
  userId:string | null = '';
  allOrders:IOrders [] = [];

  ngOnInit(): void {
    if (localStorage.getItem('userId') !==null) {
      this.userId = localStorage.getItem('userId');
    }
    this.getUserOrdersSub = this._OrdersService.getUserOrders(this.userId).subscribe({
      next:(res)=>{
        this.allOrders = res; 
      },
    })
  }

  ngOnDestroy(): void {
    this.getUserOrdersSub?.unsubscribe();
  }
}
