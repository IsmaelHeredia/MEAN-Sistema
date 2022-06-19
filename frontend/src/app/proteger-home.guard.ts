import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { IngresoService } from "./ingreso/ingreso.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ProtegerHomeGuard implements CanActivate {

  constructor(
    public ingresoService: IngresoService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.ingresoService.validar_acceso().subscribe(
        data => {
           var estado = data.estado;
           if(estado == 200) {
            var token = data.token;
            if(token != "") {
              this.router.navigate(["administracion/index"]).then(() => {
                return false;
              });
            } else {
              this.router.navigate(["ingreso/index"]).then(() => {
                return false;
              });
            }
           }
        },
        error => {
          console.log(error);
          this.router.navigate(["ingreso/index"]).then(() => {
            return false;
          });
        }
      );

      return true;

  }
  
}
