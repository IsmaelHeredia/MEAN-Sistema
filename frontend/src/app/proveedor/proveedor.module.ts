import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { ProveedorRoutingModule } from "./proveedor-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IndexComponent } from "./index/index.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";

@NgModule({
  declarations: [IndexComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ProveedorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProveedorModule { }
