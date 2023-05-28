import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearCicloComponent } from './crear-ciclo/crear-ciclo.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    CrearCicloComponent,

  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProtectedModule { }
