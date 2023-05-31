import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearCicloComponent } from './crear-ciclo/crear-ciclo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminComponent } from './admin/admin.component';
import { IsAdminGuard } from '../guards/is-admin.guard';


const routes: Routes = [

  {
    path:'',
    component: DashboardComponent,
    children: [
      {path:'perfil', component: PerfilComponent},
      {path:'admin',
      canActivate: [IsAdminGuard],
      component: AdminComponent},
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
