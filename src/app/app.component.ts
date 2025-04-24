import { NetworkService } from './core/services/network.service';
import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ECommerce';
  
  constructor(){}

  readonly _NetworkService = inject(NetworkService);
  online:boolean =true;

  ngOnInit(): void {
    const onlineStatus = computed(() => this._NetworkService.isOnline());
    this.online = onlineStatus();
  }
}
