import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import {  Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CambiarUsuario } from "./cambiarusuario";
import { CambiarClave } from "./cambiarclave";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CuentaService {

  errorMsg: string | undefined;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem(environment.nombreSesion)}`
    })
  }

  constructor(private httpClient: HttpClient) { }

  cambiarUsuario(cambiarusuario: any): Observable<any> {
    return this.httpClient.post<CambiarUsuario>(environment.apiURL + "/cuenta/cambiarUsuario", JSON.stringify(cambiarusuario), this.httpOptions)
    .pipe(
        catchError(error => {
            if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Error: ${error.error.message}`;
            } else {
                this.errorMsg = this.getServerErrorMessage(error);
            }

            return throwError(this.errorMsg);
        })
    )
  }
  
  cambiarClave(cambiarclave: any): Observable<any> {
    return this.httpClient.post<CambiarClave>(environment.apiURL + "/cuenta/cambiarClave", JSON.stringify(cambiarclave), this.httpOptions)
    .pipe(
        catchError(error => {
            if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Error: ${error.error.message}`;
            } else {
                this.errorMsg = this.getServerErrorMessage(error);
            }

            return throwError(this.errorMsg);
        })
    )
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}

}
