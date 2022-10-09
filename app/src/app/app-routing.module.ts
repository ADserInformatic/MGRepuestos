import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './components/ventas/ventas.component';
import { DeudoresComponent } from './components/deudores/deudores.component';
import { LoginComponent } from './components/login/login.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'MGRepuestos', component: PrincipalComponent, children: [
    {path: 'deudores', component: DeudoresComponent},
    {path: 'pagos', component: PagosComponent},
    {path: 'ventas', component: VentasComponent}
  ]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
