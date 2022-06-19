import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Params, Router } from "@angular/router";
import { UsuarioService } from "../../usuario/usuario.service";
import { TipoUsuarioService } from "../../usuario/tipousuario.service";
import { TipoUsuario } from "../../usuario/tipousuario";
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
  tipo:string = "";
  nombre_tipo:string = "";
  id_tipo:number = 0;

  tiposusuarios: TipoUsuario[] = [];

  form: FormGroup = new FormGroup({
    nombre: new FormControl(""),
    tipo: new FormControl("")
  });
  
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public tipoUsuarioService: TipoUsuarioService,
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

    this.tipoUsuarioService.getAll().subscribe((data: any)=>{
      this.tiposusuarios = data.tiposusuarios;
   
      this.usuarioService.find(this._id).subscribe((data: any)=>{
        var datos = data.usuario;
        
        this.nombre = datos.nombre;
        this.tipo = datos.precio;

        this.nombre_tipo = datos.tipo;

        this.tiposusuarios.forEach((tipousuario) =>{
          if(this.nombre_tipo == tipousuario.nombre) {
            this.id_tipo = tipousuario._id; 
          }
        })

        this.form = this.formBuilder.group(
          {
            nombre: [this.nombre, Validators.required],
            tipo: [this.id_tipo, Validators.required],
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

    var id_tipo = this.form.value.tipo;
    var nombre_tipo = "";

    this.tiposusuarios.forEach(function(tipousuario){
      if(tipousuario._id == id_tipo) {
        nombre_tipo = tipousuario.nombre; 
      }
    });

    this.form.controls["tipo"].setValue(nombre_tipo);

    this.usuarioService.update(this._id,this.form.value).subscribe(
      data => {
         var estado = data.estado;
         if(estado == 200) {
          this.router.navigate(["usuario/index"]).then(() => {
            this.toastr.success("Usuario editado");
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
