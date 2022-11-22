import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add',
    loadComponent: () => import('./add-countries/add-countries.component')
      .then(c => c.AddCountriesComponent)
  },
  {
    path: 'update',
    loadComponent: () => import('./update-countries/update-countries.component')
      .then(c => c.UpdateCountriesComponent)
  },
  {
    path: 'delete',
    loadComponent: () => import('./delete-countries/delete-countries.component')
      .then(c => c.DeleteCountriesComponent)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ]
})
export class CountriesModule { }
