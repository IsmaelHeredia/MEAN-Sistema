import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IngresoService } from "../../ingreso/ingreso.service";
import { CuentaService } from "../../cuenta/cuenta.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-cambiarusuario",
  templateUrl: "./cambiarusuario.component.html",
  styleUrls: ["./cambiarusuario.component.css"]
})
export class CambiarUsuarioComponent implements OnInit {

  id_usuario = 0;

  form: FormGroup = new FormGroup({
    usuario: new FormControl(""),
    nuevo_usuario: new FormControl(""),
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
              nuevo_usuario: ["", Validators.required],
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

    var nuevo_nombre = this.form.get("nuevo_usuario")?.value;

    var datos_ingreso = {
      "nombre" : nombre,
      "clave" : clave
    }

    var datos_cuenta = {
      "id" : this.id_usuario,
      "nombre" : nuevo_nombre
    }

    this.ingresoService.acceso(datos_ingreso).subscribe(
      data => {
         var estado = data.estado;
         var token = data.token;
         if(estado == 200) {
          if(token != null) {

            this.cuentaService.cambiarUsuario(datos_cuenta).subscribe(
              data => {
                 var estado = data.estado;
                 if(estado == 200) {
                  this.router.navigate(["ingreso/index"]).then(() => {
                    sessionStorage.setItem(environment.nombreSesion,"");
                    this.toastr.success("El usuario ha sido cambiado correctamente");
                  }); 
                 }
              },
              error => {
                 this.toastr.warning("Ocurrio un error cambiando el usuario");
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
