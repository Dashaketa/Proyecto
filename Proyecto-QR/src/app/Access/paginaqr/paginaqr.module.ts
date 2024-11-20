import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PaginaqrPage } from './paginaqr.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PaginaqrPage
      }
    ])
  ],
  declarations: [PaginaqrPage]
})
export class PaginaqrPageModule {}
