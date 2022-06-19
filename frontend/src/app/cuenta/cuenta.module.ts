import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { CuentaRoutingModule } from "./cuenta-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CambiarUsuarioComponent } from './cambiarusuario/cambiarusuario.component';
import { CambiarClaveComponent } from './cambiarclave/cambiarclave.component';


@NgModule({
  declarations: [
    CambiarUsuarioComponent,
    CambiarClaveComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CuentaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CuentaModule { }
