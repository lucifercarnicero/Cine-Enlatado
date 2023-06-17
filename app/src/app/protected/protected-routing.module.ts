import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearCicloComponent } from './crear-ciclo/crear-ciclo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminComponent } from './admin/admin.component';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { CiclosUserComponent } from './ciclos-user/ciclos-user.component';
import { EditarCicloComponent } from './editar-ciclo/editar-ciclo.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { TrivialComponent } from './trivial/trivial.component';


const routes: Routes = [

  {
    path:'',
    component: DashboardComponent,
    children: [
      {path:'perfil', component: PerfilComponent},
      {path:'admin',
      canActivate: [IsAdminGuard],
      component: AdminComponent},
      {path:'mis-ciclos', component: CiclosUserComponent},
      {path:'crear', component: CrearCicloComponent},
      {path:'editar/:id', component: EditarCicloComponent},
      {path:'editar-usuario/:id', component: EditarUsuarioComponent},
      {path:'trivial', component: TrivialComponent},
      {path:'**', redirectTo:''}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
