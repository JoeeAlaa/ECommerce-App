import { errorsInterceptor } from './core/interceptors/errors.interceptor';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {  provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withViewTransitions(),withInMemoryScrolling({scrollPositionRestoration:'top'})),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([headersInterceptor,errorsInterceptor,loadingInterceptor])),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(
      NgxSpinnerModule,
      TranslateModule.forRoot({
        defaultLanguage:'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};
