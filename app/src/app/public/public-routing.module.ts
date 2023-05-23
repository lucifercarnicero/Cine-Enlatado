import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { CicloComponent } from './pages/ciclo/ciclo.component';
import { RandomComponent } from './pages/random/random.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: '', // /home
    component: HomeComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'list', component: ListComponent }, // home/list
      { path: 'ciclo/:id', component: CicloComponent }, // home/ciclo
      { path: 'random', component: RandomComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
