import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationPageModule } from '../information/information.module';
import { MoviesPage } from './movies.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesPage
  },
  {
    path: 'information/:id',
    loadChildren: () => import('../information/information.module').then(m => m.InformationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
