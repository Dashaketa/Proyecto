import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaqrPage } from './paginaqr.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaqrPageRoutingModule {}
