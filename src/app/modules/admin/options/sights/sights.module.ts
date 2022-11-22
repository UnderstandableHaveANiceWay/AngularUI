import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CountrySearchResolver } from 'src/app/modules/countries/resolvers/country-search.resolver';

const routes: Routes = [
  {
    path: 'add',
    loadComponent: () => import('./add-sights/add-sights.component')
      .then(c => c.AddSightsComponent),
    resolve: {
     countries: CountrySearchResolver
    }
  },
  {
    path: 'update',
    loadComponent: () => import('./update-sights/update-sights.component')
      .then(c => c.UpdateSightsComponent),
    resolve: {
     countries: CountrySearchResolver
    }
  },
  {
    path: 'delete',
    loadComponent: () => import('./delete-sights/delete-sights.component')
      .then(c => c.DeleteSightsComponent),
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
  ]
})
export class SightsModule { }
