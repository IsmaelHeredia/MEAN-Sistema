import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "../usuario.service";
import { TipoUsuarioService } from "../tipousuario.service";
import { TipoUsuario } from "../tipousuario";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {

  tiposusuarios: TipoUsuario[] = [];

  form: FormGroup = new FormGroup({
    nombre: new FormControl(""),
    clave: new FormControl(""),
    tipo: new FormControl("")
  });
  
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public tipoUsuarioService: TipoUsuarioService,
    public usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
    ) {}

    ngOnInit(): void {

      this.tipoUsuarioService.getAll().subscribe((data: any)=>{
        this.tiposusuarios = data.tiposusuarios;
      });
  
      this.form = this.formBuilder.group(
        {
          nombre: ["", Validators.required],
          clave: ["", Validators.required],
          tipo: ["", Validators.required]
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
  
      var id_tipo = this.form.value.tipo;
      var nombre_tipo = "";
  
      this.tiposusuarios.forEach(function(tipousuario){
        if(tipousuario._id == id_tipo) {
          nombre_tipo = tipousuario.nombre; 
        }
      });
  
      this.form.controls["tipo"].setValue(nombre_tipo);
  
      this.usuarioService.create(this.form.value).subscribe(
        data => {
           var estado = data.estado;
           if(estado == 200) {
            this.router.navigate(["usuario/index"]).then(() => {
              this.toastr.success("Usuario creado");
            });
           }
        },
        error => {
           this.router.navigate(["usuario/index"]).then(() => {
            this.toastr.warning("Ocurrio un error en el proceso");
          });
        }
      );
    }

}
