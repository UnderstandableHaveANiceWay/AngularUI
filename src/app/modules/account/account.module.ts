import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/log-in/log-in.guard';
import { LogUpGuard } from './guards/log-up/log-up.guard';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import( './log-in/log-in.component' )
      .then( c => c.LogInComponent ),
    canActivate: [LoginGuard],
  },
  {
    path: 'logup',
    loadComponent: () => import('./log-up/log-up.component')
      .then( c => c.LogUpComponent),
    canActivate: [LogUpGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule],
})
export class AccountModule { }
