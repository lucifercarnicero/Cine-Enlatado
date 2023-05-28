import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearCicloComponent } from './crear-ciclo/crear-ciclo.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [

  {
    path:'',
    component: DashboardComponent,
    children: [
      {path:'perfil', component: PerfilComponent},
      {path:'crear', component: CrearCicloComponent},
      {path:'**', redirectTo:''}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
