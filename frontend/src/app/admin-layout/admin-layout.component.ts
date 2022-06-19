import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../environments/environment";
import { IngresoService } from "../ingreso/ingreso.service";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.css"]
})
export class AdminLayoutComponent implements OnInit {

  nombre_usuario = "";
  tipo = "";

  constructor(
    private router: Router,
    public ingresoService: IngresoService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {

    this.ingresoService.validar_acceso().subscribe(
      data => {
         var estado = data.estado;
         if(estado == 200) {
          var token = data.token;
          this.tipo = token.tipo;
          this.nombre_usuario = token.usuario;
         }
      }
    );

  }

  btnCerrarSesion() {
    this.router.navigate(["ingreso/index"]).then(() => {
      sessionStorage.setItem(environment.nombreSesion,"");
      this.toastr.success("Sesion cerrada");
    });    
  }

}
