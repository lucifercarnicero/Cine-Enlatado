import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { CicloComponent } from './pages/ciclo/ciclo.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { RandomComponent } from './pages/random/random.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    CicloComponent,
    RandomComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    CarouselModule

  ]
})
export class PublicModule { }
