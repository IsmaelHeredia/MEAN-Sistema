import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from "../admin-layout/admin-layout.component";
import { ProtegerRutasGuard } from "../proteger-rutas.guard";

import { IndexComponent } from "./index/index.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  { 
    path: "", component: AdminLayoutComponent,
    children: [
      { path: "producto/index", canActivate: [ProtegerRutasGuard], component: IndexComponent },
      { path: "producto/create", canActivate: [ProtegerRutasGuard], component: CreateComponent },
      { path: "producto/edit/:id", canActivate: [ProtegerRutasGuard], component: EditComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
