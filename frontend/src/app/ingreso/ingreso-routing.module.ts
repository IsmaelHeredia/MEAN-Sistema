import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { BaseLayoutComponent } from "../base-layout/base-layout.component";
import { ProtegerIngresoGuard } from "../proteger-ingreso.guard";

const routes: Routes = [
  { 
    path: "", component: BaseLayoutComponent,
    children: [
      { path: "ingreso/index", canActivate: [ProtegerIngresoGuard], component: IndexComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule { }
