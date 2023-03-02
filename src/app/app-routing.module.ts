import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from '@shared/constants/routes';

const routes: Routes = [
  {
    path: RouteConstants.empty,
    redirectTo: RouteConstants.home,
    pathMatch: 'full'
  },
  {
    path: RouteConstants.wildcard,
    redirectTo: RouteConstants.home,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
