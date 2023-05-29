import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationPageRoutingModule } from './information-routing.module';

import { InformationPage } from './information.page';
import { MoviesPageRoutingModule } from '../movies/movies-routing.module';
import { MoviesPage } from '../movies/movies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationPageRoutingModule,
  ],
  declarations: [InformationPage]
})
export class InformationPageModule {}
