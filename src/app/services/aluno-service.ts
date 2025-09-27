import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { alunoModel } from '../models/alunoModel';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Aluno {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/alunos';
  
  private alunos: alunoModel[] = [];

  listar(): Observable<alunoModel[]>{
    return this.http.get<alunoModel[]>(`${this.baseUrl}/listar`).pipe(catchError(this.handle));
  }

  adicionar(produto: alunoModel): Observable<alunoModel>{
    return this.http.post<alunoModel>(`${this.baseUrl}/salvar`, produto).pipe(catchError(this.handle));
  }

  remover(id: string): Observable<string>{
    return this.http.post(`${this.baseUrl}/apagar/${id}`, null,
    {responseType: 'text'}).pipe(catchError(this.handle));
  }

  private handle(err: HttpErrorResponse){
    const msg = err.error?.message || err.error?.erro || err.message || 'Erro Inesperado';
    return throwError(() => new Error(msg));
  }
}
