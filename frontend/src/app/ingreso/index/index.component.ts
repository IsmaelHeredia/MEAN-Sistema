import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IngresoService } from "../ingreso.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {

  form: FormGroup = new FormGroup({
    nombre: new FormControl(""),
    clave: new FormControl("")
  });
  
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public ingresoService: IngresoService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        nombre: ["", Validators.required],
        clave: ["", Validators.required]
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

    this.ingresoService.acceso(this.form.value).subscribe(
      data => {
         var estado = data.estado;
         var token = data.token;
         if(token != null) {
          sessionStorage.setItem(environment.nombreSesion,token);
          this.router.navigate(["administracion/index"]).then(() => {
            this.toastr.success("Ingreso válido");
          });
         } else {
          this.toastr.warning("Ingreso inválido");
         }
      },
      error => {
         this.toastr.warning("Ocurrio un error en el proceso");
      }
    );
  }

}
