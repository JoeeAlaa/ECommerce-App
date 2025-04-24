import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, RendererFactory2, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  readonly _PLATFORM_ID = inject(PLATFORM_ID);
  readonly _Renderer2 = inject(RendererFactory2).createRenderer(null,null);
  private readonly _translateService = inject(TranslateService);
  constructor(){

    if(isPlatformBrowser(this._PLATFORM_ID)){
      
      this._translateService.setDefaultLang('en');
      this.setLang();
    }

  }


  setLang():void {
    let savedLang  = localStorage.getItem('lang');    
    if(savedLang !== null){
      this._translateService.use(  savedLang  !);
    }
    if(savedLang === 'en'){
      this._Renderer2.setAttribute(document.documentElement, 'dir' , 'ltr');
      this._Renderer2.setAttribute(document.documentElement , 'lang' , 'en');
      
    }
    else if (savedLang === 'ar') {
      this._Renderer2.setAttribute(document.documentElement , 'dir' , 'rtl');
      this._Renderer2.setAttribute(document.documentElement , 'lang' , 'ar');    
    }

  }


  changeLang(lang : string):void {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      localStorage.setItem('lang'  , lang);
      this.setLang();
    }
  }

}

