import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOptionsPageGuard } from './modules/admin/guards/admin-options-page/admin-options-page.guard';

const routes: Routes = [
  {
    path: 'sight',
    loadChildren: () => import('./modules/sight/sight.module')
      .then( m => m.SightModule )
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module')
      .then( m => m.AdminModule ),
    canActivate: [AdminOptionsPageGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module')
      .then( m => m.AccountModule )
  },
  {
    path: '',
    redirectTo: '/sight/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
