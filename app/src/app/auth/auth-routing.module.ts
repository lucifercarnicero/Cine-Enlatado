import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';

const routes: Routes = [

  {
    path:'',
    component: MainComponent,
    children:[

      {path: 'login', component: LoginComponent}, //  auth/login
      {path: 'register', component: RegisterComponent}, // auth/register
      {path: 'logout', component: LogoutComponent},
      {path: '**', redirectTo: 'login'}


    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
