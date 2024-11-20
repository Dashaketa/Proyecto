import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';

// Puedes definir una interfaz para manejar el error si lo deseas
interface ApiError {
  status: number;
  message: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
  users: User[] = []; // Inicializa la lista de usuarios

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers(); // Carga los usuarios al inicializar el componente
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => { // Usa la interfaz aquí también
        this.users = data; // Asigna los datos recibidos a la variable users
      },
      error: (error: ApiError) => { // Especifica el tipo para el error
        console.error('Error loading users:', error); // Manejo de errores
        // Aquí puedes agregar lógica adicional, como mostrar un mensaje al usuario
      },
    });
  }

  deleteUser(usuario: string) {
    this.userService.deleteUser(usuario).subscribe({
      next: () => {
        this.loadUsers(); // Recarga la lista de usuarios después de eliminar
      },
      error: (error: ApiError) => { // Especifica el tipo para el error
        console.error('Error deleting user:', error); // Manejo de errores
        // Aquí también puedes agregar lógica adicional para mostrar un mensaje
      },
    });
  }
}