import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductoService } from "../producto.service";
import { ProveedorService } from "../../proveedor/proveedor.service";
import { Proveedor } from "../../proveedor/proveedor";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {

  proveedores: Proveedor[] = [];

  form: FormGroup = new FormGroup({
    nombre: new FormControl(""),
    descripcion: new FormControl(""),
    precio: new FormControl(""),
    proveedor: new FormControl("")
  });
  
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public proveedorService: ProveedorService,
    public productoService: ProductoService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {

    this.proveedorService.getAll().subscribe((data: any)=>{
      this.proveedores = data.proveedores;
    });

    this.form = this.formBuilder.group(
      {
        nombre: ["", Validators.required],
        descripcion: ["", Validators.required],
        precio: ["", Validators.required],
        proveedor: ["", Validators.required]
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

    var id_proveedor = this.form.value.proveedor;
    var nombre_proveedor = "";

    this.proveedores.forEach(function(proveedor){
      if(proveedor._id == id_proveedor) {
        nombre_proveedor = proveedor.nombre; 
      }
    });

    this.form.controls["proveedor"].setValue(nombre_proveedor);

    this.productoService.create(this.form.value).subscribe(
      data => {
         var estado = data.estado;
         if(estado == 200) {
          this.router.navigate(["producto/index"]).then(() => {
            this.toastr.success("Producto creado");
          });
         }
      },
      error => {
         this.router.navigate(["producto/index"]).then(() => {
          this.toastr.warning("Ocurrio un error en el proceso");
        });
      }
    );
  }

}
