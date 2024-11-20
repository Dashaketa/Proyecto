import { Component } from '@angular/core';
import { UserService } from '../../services/user.service'; // Asegúrate de importar UserService
import { Capacitor } from '@capacitor/core'; // Importa Capacitor

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  tipoUsuario: string = '';
  fechaNacimiento: string = '';
  password: string = '';
  mensaje: string = '';
  showDateTime: boolean = false;
}
  /*constructor(private sqliteService: SQLiteService, private userService: UserService) {}

  register() {
    const user = {
      usuario: this.usuario,
      nombre: this.nombre,
      apellido: this.apellido,
      tipoUsuario: this.tipoUsuario,
      fechaNacimiento: this.fechaNacimiento,
      password: this.password,
    };

    if (Capacitor.isNativePlatform()) {
      this.sqliteService.addUser(user).then(() => {
        this.mensaje = 'Usuario registrado con éxito';
        this.clearForm(); // Limpiar el formulario
      }).catch(e => {
        console.error('Error al registrar usuario en SQLite:', e);
        this.mensaje = 'Error al registrar usuario';
      });
    } else {
      this.userService.addUser(user);
      this.mensaje = 'Usuario registrado en almacenamiento local';
      this.clearForm(); // Limpiar el formulario
    }
  }

  clearForm() {
    this.usuario = '';
    this.nombre = '';
    this.apellido = '';
    this.tipoUsuario = '';
    this.fechaNacimiento = '';
    this.password = '';
  }

  onDateChange(event: any) {
    this.fechaNacimiento = event.detail.value;
    this.showDateTime = false; // Cerrar el modal después de seleccionar la fecha
  }
}
*/