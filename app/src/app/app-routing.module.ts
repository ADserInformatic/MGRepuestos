import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ProtegiendoRutaGuard } from './guard/protegiendo-ruta.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'MGRepuestos', component: PrincipalComponent, canActivate: [ProtegiendoRutaGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
