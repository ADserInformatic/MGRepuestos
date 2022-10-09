import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { DeudoresComponent } from './components/deudores/deudores.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { VentasComponent } from './components/ventas/ventas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    DeudoresComponent,
    PagosComponent,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
