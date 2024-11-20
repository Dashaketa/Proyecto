import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
  private apiUrl = 'https://amazing-yearly-cicada.ngrok-free.app/api/clases';

  constructor(private http: HttpClient) {}

  // Helper function to add the ngrok-skip-browser-warning header
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true', // Añadimos el encabezado
      }),
    };
  }

  // Obtener todas las clases
  getClases(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getHttpOptions());
  }

  // Agregar una nueva clase
  addClase(nombreClase: string): Observable<any> {
    return this.http.post(this.apiUrl, { nombreClase }, this.getHttpOptions());
  }

  // Eliminar una clase
  deleteClase(idClase: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idClase}`, this.getHttpOptions());
  }
}
