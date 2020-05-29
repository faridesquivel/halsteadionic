import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProgramPage } from './view-program.page';

const routes: Routes = [
  {
    path: '',
    component: ViewProgramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProgramPageRoutingModule {}
