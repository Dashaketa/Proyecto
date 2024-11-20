import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la interfaz User
export interface User {
  usuario: string;
  nombre: string;
  apellido: string;
  tipoUsuario: string;
  fechaNacimiento: string;
  contrasena?: string; // Opcional, ya que no siempre deberías enviar la contraseña
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://amazing-yearly-cicada.ngrok-free.app/api'; // Asegúrate de que esto sea correcto

  constructor(private http: HttpClient) {}

  // Helper function to add the ngrok-skip-browser-warning header
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true', // Add the ngrok header
      }),
    };
  }

  // Método para obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, this.getHttpOptions());
  }

  // Método para eliminar un usuario
  deleteUser(usuario: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${usuario}`, this.getHttpOptions());
  }

  // Método para registrar un usuario
  registerUser(user: User): Observable<any> {
    console.log('Datos a registrar:', user);
    return this.http.post(`${this.apiUrl}/register`, user, this.getHttpOptions());
  }

  // Método para actualizar un usuario
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.usuario}`, user, this.getHttpOptions());
  }
}
