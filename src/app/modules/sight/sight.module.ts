import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CountrySearchResolver } from '../countries/resolvers/country-search.resolver';
import { SightViewResolver } from './sight-view/resolvers/sight-view.resolver';

const routes: Routes = [
  {
    path: 'search',
    loadComponent: () => import('./sight-search-form/sight-search-form.component')
      .then( c => c.SightSearchFormComponent ),
    resolve: {
      countries: CountrySearchResolver
    }
  },
  {
    path: ':id',
    loadComponent: () => import('./sight-view/sight-view.component')
      .then( c => c.SightViewComponent ),
    resolve: {
      sight: SightViewResolver
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [
    RouterModule
  ]
})
export class SightModule { }
