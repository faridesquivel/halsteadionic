import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
      }, {
        path: 'file',
        loadChildren: () => import('./file/file.module').then( m => m.FilePageModule)
      }, {
        path: 'code',
        loadChildren: () => import('./code/code.module').then( m => m.CodePageModule)
      },
      {
        path: 'metrics',
        loadChildren: () => import('./metrics/metrics.module').then( m => m.MetricsPageModule)
      },
      {
        path: 'saved',
        loadChildren: () => import('./saved/saved.module').then( m => m.SavedPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
