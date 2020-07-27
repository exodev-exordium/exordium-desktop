import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { ToastrModule } from 'ngx-toastr';
import { NotyfToast } from './shared/components/notyf.toast';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Pages
import { AuthSigninComponent } from './_pages/auth/auth-signin/auth-signin.component';
import { DashboardComponent } from './_pages/dashboard/dashboard/dashboard.component';

import { AppComponent } from './app.component';
import { PerfectScrollbarDirective } from './shared/directives/scrollbar/perfect-scrollbar.directive';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PerfectScrollbarDirective,
    AuthSigninComponent, 
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RecaptchaModule, 
    RecaptchaFormsModule,
    ToastrModule.forRoot({
      toastComponent: NotyfToast,
      timeOut: 6000,
      positionClass: 'toast-bottom-right'
    }),
    LoadingBarModule,

    CoreModule,
    SharedModule,

    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [
    //NotyfToast
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
   },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LeB5uIUAAAAAMQWnwCUpUHbdsHO4iV4emdn9KOL'
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
