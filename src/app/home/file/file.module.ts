import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { FilePageRoutingModule } from './file-routing.module';

import { FilePage } from './file.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilePageRoutingModule,
    NgxDropzoneModule
  ],
  declarations: [FilePage]
})
export class FilePageModule {}
