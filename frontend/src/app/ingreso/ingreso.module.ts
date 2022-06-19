import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IngresoRoutingModule } from "./ingreso-routing.module";
import { IndexComponent } from "./index/index.component";

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IngresoRoutingModule
  ]
})
export class IngresoModule { }
