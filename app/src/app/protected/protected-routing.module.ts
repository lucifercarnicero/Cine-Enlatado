import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearCicloComponent } from './crear-ciclo/crear-ciclo.component';

const routes: Routes = [

  {
    path:'dashboard',
    component: DashboardComponent,
    children: [
      {path:'crear', component: CrearCicloComponent},
      {path:'', component: DashboardComponent},
      {path:'**', redirectTo:''}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
