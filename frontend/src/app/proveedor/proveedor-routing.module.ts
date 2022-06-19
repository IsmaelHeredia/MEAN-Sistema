import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "../admin-layout/admin-layout.component";
import { ProtegerRutasGuard } from "../proteger-rutas.guard";

import { IndexComponent } from "./index/index.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  { 
    path: "", component: AdminLayoutComponent,
    children: [
      { path: "proveedor/index", canActivate: [ProtegerRutasGuard], component: IndexComponent },
      { path: "proveedor/create", canActivate: [ProtegerRutasGuard], component: CreateComponent },
      { path: "proveedor/edit/:id", canActivate: [ProtegerRutasGuard], component: EditComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
