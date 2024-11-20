import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service'; // Importa AuthService

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = {
    username: '',
    password: ''
  };
  showPassword: boolean = false;
  mensaje = '';
  spinner = false;

  constructor(
    private router: Router,
    private animationController: AnimationController,
    private http: HttpClient,
    private authService: AuthService // Inyección de AuthService
  ) {}

  ngAfterContentInit() {
    this.animarLogin();
  }

  // Método para animar el icono de login
  animarLogin() {
    const loginIcon = document.querySelector(".login img") as HTMLElement;
    const animacion = this.animationController.create()
      .addElement(loginIcon)
      .duration(4000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateX(0)', opacity: '1' },
        { offset: 0.5, transform: 'translateX(50vw)', opacity: '0.2' },
        { offset: 1, transform: 'translateX(0)', opacity: '1' }
      ]);
    animacion.play();
  }

  // Método para cambiar el estado del spinner
  cambiarSpinner() {
    this.spinner = !this.spinner;
  }

  // Helper function to add ngrok-skip-browser-warning header
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true', // Añadir el encabezado aquí
      }),
    };
  }

  // Método para validar el usuario e iniciar sesión
  validar() {
    const complexPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.,\-!])[a-zA-Z0-9.,\-!]*$/;

    if (this.user.username.length > 0) {
      if (this.user.password.length >= 8 && complexPattern.test(this.user.password)) {
        // Muestra el spinner antes de llamar a la API
        this.cambiarSpinner();

        // Llamada a la API para login
        this.http.post('https://amazing-yearly-cicada.ngrok-free.app/api/login', {
          usuario: this.user.username.toLowerCase(), // Normaliza a minúsculas
          contrasena: this.user.password
        }, this.getHttpOptions()).subscribe({
          next: (response: any) => {
            console.log('Respuesta de la API:', response); // Verifica la estructura de la respuesta

            // Guarda los datos del usuario en AuthService
            this.authService.login(response); // Utiliza AuthService para guardar el usuario autenticado
            
            // Configura los datos para la navegación
            let navigationExtras: NavigationExtras = {
              state: {
                user: {
                  usuario: response.usuario, // Aquí estás accediendo directamente al valor
                  nombre: response.nombre,
                  apellido: response.apellido,
                  tipoUsuario: response.tipoUsuario,
                  fechaNacimiento: response.fechaNacimiento,
                }
              }
            };

            // Navega a la página de perfil
            this.router.navigate(['/perfil'], navigationExtras);
            this.cambiarSpinner(); // Detiene el spinner
            this.mensaje = 'Conexión exitosa'; // Mensaje de éxito
          },
          error: (error) => {
            console.error('Error al iniciar sesión', error);
            this.mensaje = 'Usuario o contraseña incorrectos'; // Mensaje de error
            this.cambiarSpinner(); // Detiene el spinner
          }
        });
      } else {
        this.mensaje = 'Su contraseña debe tener un largo de 8 caracteres y contener al menos 1 número, 1 letra y 1 símbolo';
      }
    } else {
      this.mensaje = 'Usuario vacío';
    }
  }

  // Método para mostrar u ocultar la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
