import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
// Función para capitalizar
const capitalize = (str: string) => {
  if (!str) return str;
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
})
export class PerfilComponent implements OnInit {
  // Propiedades del perfil
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  tipoUsuario: string = '';
  fechaNacimiento: string | null = null;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    if (state && state['user']) {
      console.log('Datos del usuario recibidos:', state['user']);
      const user = state['user'];

      this.username = capitalize(user.usuario);
      this.nombre = capitalize(user.nombre);
      this.apellido = capitalize(user.apellido);
      this.tipoUsuario = capitalize(user.tipoUsuario);

      this.fechaNacimiento = user.fechaNacimiento
        ? new Date(user.fechaNacimiento).toISOString().split('T')[0]
        : null;
    } else {
      console.warn('No se recibieron datos del usuario');
    }
  }

  // Navegar al escáner de QR
  escaneoQR() {
    this.router.navigate(['/scanner'], {
      state: {
        user: {
          username: this.username,
          nombre: this.nombre,
          apellido: this.apellido,
        }
      }
    });  // Redirige a la página de escaneo de QR y pasa los datos del usuario
  }

  // Navegar a la gestión de clases
  gestionarClases() {
    this.router.navigate(['/gestion-clases']);
  }

  // Registrar asistencia
  registrarAsistencia() {
    this.router.navigate(['/seleccionar-clase']);
  }

  // Editar los datos del perfil
  editarDatos() {
    this.router.navigate(['/edit-profile'], {
      state: {
        user: {
          usuario: this.username,
          nombre: this.nombre,
          apellido: this.apellido,
          fechaNacimiento: this.fechaNacimiento,
        },
      },
    });
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
