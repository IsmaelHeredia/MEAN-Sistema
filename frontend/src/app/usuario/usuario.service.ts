import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import {  Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Usuario } from "./usuario";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {

  errorMsg: string | undefined;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem(environment.nombreSesion)}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(environment.apiURL + "/usuarios", this.httpOptions)
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
   
  create(usuario: any): Observable<any> {
    return this.httpClient.post<Usuario>(environment.apiURL + "/usuarios", JSON.stringify(usuario), this.httpOptions)
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
    return this.httpClient.get<Usuario>(environment.apiURL + "/usuarios/" + id, this.httpOptions)
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
   
  update(id: string, usuario: any): Observable<any> {
    return this.httpClient.put<Usuario>(environment.apiURL + "/usuarios/" + id, JSON.stringify(usuario), this.httpOptions)
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
    return this.httpClient.delete<any>(environment.apiURL + "/usuarios/" + id, this.httpOptions)
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
