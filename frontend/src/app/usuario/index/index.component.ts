import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../usuario.service";
import { Usuario } from "../usuario";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    public usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
    ) { }

    ngOnInit(): void {
      this.usuarioService.getAll().subscribe((data: any)=>{
        this.usuarios = data.usuarios;
      })  
    }

    deleteUsuario(id: number){

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
  
          this.usuarioService.delete(id).subscribe(
            res => {
               this.usuarios = this.usuarios.filter(item => item._id !== id);
               this.router.navigate(["usuario/index"]).then(() => {
                this.toastr.success("Usuario borrado");
               });
            },
            error => {
               this.router.navigate(["usuario/index"]).then(() => {
                this.toastr.warning("Ocurrio un error en el proceso");
               });
            }
          );
          
        }
      })

    }

}
