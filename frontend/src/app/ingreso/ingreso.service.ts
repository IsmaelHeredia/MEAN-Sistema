import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import {  Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Ingreso } from "./ingreso";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class IngresoService {

  errorMsg: string | undefined;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private httpClient: HttpClient) { }

  acceso(ingreso: any): Observable<any> {
    return this.httpClient.post<Ingreso>(environment.apiURL + "/acceso/", JSON.stringify(ingreso), this.httpOptions)
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

  validar_acceso(): Observable<any> {
    var token = sessionStorage.getItem(environment.nombreSesion);
    var datos = { "token" : token};
    return this.httpClient.post(environment.apiURL + "/acceso/validar", JSON.stringify(datos), this.httpOptions)
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
