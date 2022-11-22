import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'page',
    loadComponent: () => import('./admin-options-page/admin-options-page.component')
      .then(c => c.AdminOptionsPageComponent)
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module')
      .then(c => c.CountriesModule)
  },
  {
    path: 'cities',
    loadChildren: () => import('./cities/cities.module')
      .then(c => c.CitiesModule)
  },
  {
    path: 'sights',
    loadChildren: () => import('./sights/sights.module')
      .then(c => c.SightsModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class OptionsModule { }
