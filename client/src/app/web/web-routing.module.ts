import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewCicloPageComponent } from './pages/new-ciclo-page/new-ciclo-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { CicloPageComponent } from './pages/ciclo-page/ciclo-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'new', component: NewCicloPageComponent, pathMatch: 'full'},
      {path: 'search', component: SearchPageComponent},
      {path: 'edit/:id', component: NewCicloPageComponent},
      {path: 'list', component: ListPageComponent},
      {path: ':id', component: CicloPageComponent}, //comodín para el id, tiene que ir al final sino no entra en las otras rutas
      {path: '', component: HomePageComponent},
      {path: '**', redirectTo: ''},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
