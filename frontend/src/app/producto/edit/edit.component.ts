import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Params, Router } from "@angular/router";
import { ProveedorService } from "../../proveedor/proveedor.service";
import { ProductoService } from "../../producto/producto.service";
import { Proveedor } from "../../proveedor/proveedor";
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
  descripcion:string = "";
  precio:number = 0;
  nombre_proveedor:string = "";
  id_proveedor:number = 0;

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

    this.proveedorService.getAll().subscribe((data: any)=>{
      this.proveedores = data.proveedores;
   
      this.productoService.find(this._id).subscribe((data: any)=>{
        var datos = data.producto;
        
        this.nombre = datos.nombre;
        this.descripcion = datos.descripcion;
        this.precio = datos.precio;
        this.nombre_proveedor = datos.proveedor;

        this.proveedores.forEach((proveedor) =>{
          if(this.nombre_proveedor == proveedor.nombre) {
            this.id_proveedor = proveedor._id; 
          }
        })

        this.form = this.formBuilder.group(
          {
            nombre: [this.nombre, Validators.required],
            descripcion: [this.descripcion, Validators.required],
            precio: [this.precio, Validators.required],
            proveedor: [this.id_proveedor, Validators.required],
          }
        );

      });

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

    var id_proveedor = this.form.value.proveedor;
    var nombre_proveedor = "";

    this.proveedores.forEach(function(proveedor){
      if(proveedor._id == id_proveedor) {
        nombre_proveedor = proveedor.nombre; 
      }
    });

    this.form.controls["proveedor"].setValue(nombre_proveedor);

    this.productoService.update(this._id,this.form.value).subscribe(
      data => {
         var estado = data.estado;
         if(estado == 200) {
          this.router.navigate(["producto/index"]).then(() => {
            this.toastr.success("Producto editado");
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
