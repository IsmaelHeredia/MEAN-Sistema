import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { IngresoModule } from "./ingreso/ingreso.module";
import { AdministracionModule } from "./administracion/administracion.module";
import { ProductoModule } from "./producto/producto.module";
import { ProveedorModule } from "./proveedor/proveedor.module";
import { UsuarioModule } from "./usuario/usuario.module";
import { CuentaModule } from "./cuenta/cuenta.module";

import { HomeComponent } from "./home/home.component";
import { BaseLayoutComponent } from "./base-layout/base-layout.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";

import { HttpClientModule } from "@angular/common/http";

import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IngresoModule,
    AdministracionModule,
    ProductoModule,
    ProveedorModule,
    UsuarioModule,
    CuentaModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }