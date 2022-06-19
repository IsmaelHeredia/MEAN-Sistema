import { Component, OnInit } from "@angular/core";
import { ProveedorService } from "../proveedor.service";
import { Proveedor } from "../proveedor";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {

  proveedores: Proveedor[] = [];

  constructor(
    public proveedorService: ProveedorService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.proveedorService.getAll().subscribe((data: any)=>{
      this.proveedores = data.proveedores;
    })  
  }

  deleteProveedor(id: number){


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

        this.proveedorService.delete(id).subscribe(
          res => {
             this.proveedores = this.proveedores.filter(item => item._id !== id);
             this.router.navigate(["proveedor/index"]).then(() => {
              this.toastr.success("Proveedor borrado");
             });
          },
          error => {
             this.router.navigate(["proveedor/index"]).then(() => {
              this.toastr.warning("Ocurrio un error en el proceso");
             });
          }
        );
        
      }
    })

  }

}
