import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DfpModule } from '@wwei/dfp';

import { LazyLoadingComponent } from './lazy-loading.component';

const routes: Routes = [
  {
    path: '',
    component: LazyLoadingComponent,
  },
];

@NgModule({
  declarations: [LazyLoadingComponent],
  imports: [CommonModule, DfpModule, RouterModule.forChild(routes)],
  exports: [RouterModule, LazyLoadingComponent],
})
export class LazyLoadingRoutingModule {}
