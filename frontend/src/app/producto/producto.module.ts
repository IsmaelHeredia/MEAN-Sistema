import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { ProductoRoutingModule } from "./producto-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IndexComponent } from "./index/index.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";

@NgModule({
  declarations: [IndexComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ProductoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductoModule { }
