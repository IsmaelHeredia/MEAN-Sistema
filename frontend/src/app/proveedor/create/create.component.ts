import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProveedorService } from "../proveedor.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {

  form: FormGroup = new FormGroup({
    nombre: new FormControl(""),
    direccion: new FormControl(""),
    telefono: new FormControl(""),
  });
  
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public proveedorService: ProveedorService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        nombre: ["", Validators.required],
        direccion: ["", Validators.required],
        telefono: ["", Validators.required],
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

    this.proveedorService.create(this.form.value).subscribe(
      data => {
         var estado = data.estado;
         if(estado == 200) {
          this.router.navigate(["proveedor/index"]).then(() => {
            this.toastr.success("Proveedor creado");
          });
         }
      },
      error => {
         this.router.navigate(["proveedor/index"]).then(() => {
          this.toastr.warning("Ocurrio un error en el proceso");
        });
      }
    );
  }

}
