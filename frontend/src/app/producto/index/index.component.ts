import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../producto.service";
import { Producto } from "../producto";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {

  productos: Producto[] = [];

  constructor(
    public productoService: ProductoService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.productoService.getAll().subscribe((data: any)=>{
      this.productos = data.productos;
    })  
  }

  deleteProducto(id: number){

    swal.fire({
      title: "Está seguro ?",
      text: "Si borra el registro no podrá recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.isConfirmed) {

        this.productoService.delete(id).subscribe(
          res => {
             this.productos = this.productos.filter(item => item._id !== id);
             this.router.navigate(["producto/index"]).then(() => {
              this.toastr.success("Producto borrado");
             });
          },
          error => {
             this.router.navigate(["producto/index"]).then(() => {
              this.toastr.warning("Ocurrio un error en el proceso");
             });
          }
        );

      }
    })

  }

}
