import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProgramPageRoutingModule } from './view-program-routing.module';

import { ViewProgramPage } from './view-program.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProgramPageRoutingModule
  ],
  declarations: [ViewProgramPage]
})
export class ViewProgramPageModule {}
