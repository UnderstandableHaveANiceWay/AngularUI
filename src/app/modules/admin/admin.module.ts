import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'options',
    loadChildren: () => import('./options/options.module')
      .then(c => c.OptionsModule)
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class AdminModule { }
