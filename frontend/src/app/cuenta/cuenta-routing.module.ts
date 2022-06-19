import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from "../admin-layout/admin-layout.component";
import { ProtegerRutasGuard } from "../proteger-rutas.guard";

import { CambiarUsuarioComponent } from "./cambiarusuario/cambiarusuario.component";
import { CambiarClaveComponent } from "./cambiarclave/cambiarclave.component";

const routes: Routes = [
  { 
    path: "", component: AdminLayoutComponent,
    children: [
      { path: "cuenta/cambiarusuario", canActivate: [ProtegerRutasGuard], component: CambiarUsuarioComponent },
      { path: "cuenta/cambiarclave", canActivate: [ProtegerRutasGuard], component: CambiarClaveComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
