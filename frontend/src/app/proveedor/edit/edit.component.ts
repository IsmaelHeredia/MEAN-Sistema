import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Params, Router } from "@angular/router";
import { ProveedorService } from "../proveedor.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {

  _id:string = "";
  nombre:string = "";
  direccion:string = "";
  telefono:number = 0;

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
    private toastr: ToastrService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {

    this.route.params
    .subscribe(
      (params: Params) => {
        this._id = params["id"];
      }
    );

    this.proveedorService.find(this._id).subscribe((data: any)=>{
      var datos = data.proveedor;
      
      this.nombre = datos.nombre;
      this.direccion = datos.direccion;
      this.telefono = datos.telefono;

      this.form = this.formBuilder.group(
        {
          nombre: [this.nombre, Validators.required],
          direccion: [this.direccion, Validators.required],
          telefono: [this.telefono, Validators.required],
        }
      );

    });
  
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
    
  onSubmit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.proveedorService.update(this._id,this.form.value).subscribe(
      data => {
         var estado = data.estado;
         if(estado == 200) {
          this.router.navigate(["proveedor/index"]).then(() => {
            this.toastr.success("Proveedor editado");
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
