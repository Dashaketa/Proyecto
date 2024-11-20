import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionarClasePage } from './seleccionar-clase.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionarClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionarClasePageRoutingModule {}
