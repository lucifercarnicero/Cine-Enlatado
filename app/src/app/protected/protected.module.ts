import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearCicloComponent } from './crear-ciclo/crear-ciclo.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminComponent } from './admin/admin.component';
import { CiclosUserComponent } from './ciclos-user/ciclos-user.component';
import { UsersComponent } from './admin/components/users/users.component';
import { CiclosComponent } from './admin/components/ciclos/ciclos.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CrearCicloComponent,
    PerfilComponent,
    AdminComponent,
    CiclosUserComponent,
    UsersComponent,
    CiclosComponent,

  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProtectedModule { }
