import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { NgImageSliderModule } from 'ng-image-slider';

import { JwtModule } from '@auth0/angular-jwt';

import { HeaderComponent } from './modules/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountrySearchFormComponent } from './modules/countries/country-search-form/country-search-form.component';
import { CitySearchFormComponent } from './modules/cities/city-search-form/city-search-form.component';
import { SightImageSliderComponent } from './modules/sight/sight-image-slider/sight-image-slider.component';
import { AuthInterceptorService } from './services/account/auth-interceptor/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    NgImageSliderModule,
    HeaderComponent,
    CountrySearchFormComponent,
    CitySearchFormComponent,
    SightImageSliderComponent,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('id_token'),
        allowedDomains: ['localhost:4200']
      } }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
