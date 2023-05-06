import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { CicloComponent } from './pages/ciclo/ciclo.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    CicloComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule

  ]
})
export class PublicModule { }
