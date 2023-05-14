import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearCicloComponent } from './crear-ciclo/crear-ciclo.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    CrearCicloComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule
  ]
})
export class ProtectedModule { }
