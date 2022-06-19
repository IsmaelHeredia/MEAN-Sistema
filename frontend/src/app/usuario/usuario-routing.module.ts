import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "../admin-layout/admin-layout.component";
import { ProtegerRutasAdminGuard } from "../proteger-rutas-admin.guard";

import { IndexComponent } from "./index/index.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  { 
    path: "", component: AdminLayoutComponent,
    children: [
      { path: "usuario/index", canActivate: [ProtegerRutasAdminGuard], component: IndexComponent },
      { path: "usuario/create", canActivate: [ProtegerRutasAdminGuard], component: CreateComponent },
      { path: "usuario/edit/:id", canActivate: [ProtegerRutasAdminGuard], component: EditComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
