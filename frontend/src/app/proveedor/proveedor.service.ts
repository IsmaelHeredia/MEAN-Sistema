import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import {  Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Proveedor } from "./proveedor";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProveedorService {

  errorMsg: string | undefined;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem(environment.nombreSesion)}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Proveedor[]> {
    return this.httpClient.get<Proveedor[]>(environment.apiURL + "/proveedores", this.httpOptions)
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
   
  create(proveedor: any): Observable<any> {
    return this.httpClient.post<Proveedor>(environment.apiURL + "/proveedores", JSON.stringify(proveedor), this.httpOptions)
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
   
  find(id: string): Observable<any> {
    return this.httpClient.get<Proveedor>(environment.apiURL + "/proveedores/" + id, this.httpOptions)
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
   
  update(id: string, proveedor: any): Observable<any> {
    return this.httpClient.put<Proveedor>(environment.apiURL + "/proveedores/" + id, JSON.stringify(proveedor), this.httpOptions)
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
   
  delete(id: number){
    return this.httpClient.delete<any>(environment.apiURL + "/proveedores/" + id, this.httpOptions)
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
    
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = "";
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
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
