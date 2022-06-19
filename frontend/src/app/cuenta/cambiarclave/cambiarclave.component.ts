import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IngresoService } from "../../ingreso/ingreso.service";
import { CuentaService } from "../../cuenta/cuenta.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-cambiarclave",
  templateUrl: "./cambiarclave.component.html",
  styleUrls: ["./cambiarclave.component.css"]
})
export class CambiarClaveComponent implements OnInit {

  id_usuario = 0;

  form: FormGroup = new FormGroup({
    usuario: new FormControl(""),
    nueva_clave: new FormControl(""),
    clave_actual: new FormControl("")
  });
  
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public ingresoService: IngresoService,
    public cuentaService: CuentaService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {

    this.ingresoService.validar_acceso().subscribe(
      data => {
         var estado = data.estado;
         if(estado == 200) {
          var token = data.token;
          var nombre_usuario = token.usuario;

          this.id_usuario = token.id;

          this.form = this.formBuilder.group(
            {
              usuario: [nombre_usuario, Validators.required],
              nueva_clave: ["", Validators.required],
              clave_actual: ["", Validators.required]
            }
          );
         }
      }
    );

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
    
  onSubmit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);

    var nombre = this.form.get("usuario")?.value;
    var clave = this.form.get("clave_actual")?.value;

    var nueva_clave = this.form.get("nueva_clave")?.value;

    var datos_ingreso = {
      "nombre" : nombre,
      "clave" : clave
    }

    var datos_cuenta = {
      "id" : this.id_usuario,
      "clave" : nueva_clave
    }

    this.ingresoService.acceso(datos_ingreso).subscribe(
      data => {
         var estado = data.estado;
         var token = data.token;
         if(estado == 200) {
          if(token != null) {

            this.cuentaService.cambiarClave(datos_cuenta).subscribe(
              data => {
                 var estado = data.estado;
                 if(estado == 200) {
                  this.router.navigate(["ingreso/index"]).then(() => {
                    sessionStorage.setItem(environment.nombreSesion,"");
                    this.toastr.success("La clave ha sido cambiada correctamente");
                  }); 
                 }
              },
              error => {
                 this.toastr.warning("Ocurrio un error cambiando la clave");
              }
            );

          } else {
            this.toastr.warning("Datos inválidos");
          }
         }
      },
      error => {
         this.toastr.warning("Datos inválidos");
      }
    );

  }

}
