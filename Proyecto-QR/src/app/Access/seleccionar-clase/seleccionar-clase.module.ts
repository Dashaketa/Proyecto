import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionarClasePageRoutingModule } from './seleccionar-clase-routing.module';

import { SeleccionarClasePage } from './seleccionar-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionarClasePageRoutingModule
  ],
  declarations: [SeleccionarClasePage]
})
export class SeleccionarClasePageModule {}
