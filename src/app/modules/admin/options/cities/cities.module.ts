import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CountrySearchResolver } from 'src/app/modules/countries/resolvers/country-search.resolver';

const routes: Routes = [
  {
    path: 'add',
    loadComponent: () => import('./add-cities/add-cities.component')
      .then(c => c.AddCitiesComponent),
    resolve: {
      countries: CountrySearchResolver
    }
  },
  {
    path: 'update',
    loadComponent: () => import('./update-cities/update-cities.component')
      .then(c => c.UpdateCitiesComponent),
    resolve: {
      countries: CountrySearchResolver
    }
  },
  {
    path: 'delete',
    loadComponent: () => import('./delete-cities/delete-cities.component')
      .then(c => c.DeleteCitiesComponent),
    resolve: {
      countries: CountrySearchResolver
    }
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
export class CitiesModule { }
