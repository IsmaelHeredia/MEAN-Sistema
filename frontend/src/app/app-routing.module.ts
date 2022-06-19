import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BaseLayoutComponent } from "./base-layout/base-layout.component";
import { ProtegerHomeGuard } from "./proteger-home.guard";

const routes: Routes = [
	{
		path: "",
		component: BaseLayoutComponent,    
		children: [
			{ path: "", canActivate: [ProtegerHomeGuard], component: HomeComponent }
		]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
