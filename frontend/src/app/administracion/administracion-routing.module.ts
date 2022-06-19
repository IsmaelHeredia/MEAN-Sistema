import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { AdminLayoutComponent } from "../admin-layout/admin-layout.component";
import { ProtegerRutasGuard } from "../proteger-rutas.guard";

const routes: Routes = [
  { 
    path: "", component: AdminLayoutComponent,
    children: [
      { path: "administracion/index", canActivate: [ProtegerRutasGuard], component: IndexComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
