import { Component } from '@angular/core';
import { UserService } from '../../services/user.service'; // Asegúrate de que la ruta sea correcta
import { AlertController, NavController } from '@ionic/angular'; // Importa AlertController y NavController

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
    isSuccess: boolean = false; // Propiedad para controlar el estado del mensaje

    constructor(private userService: UserService, private alertController: AlertController, private navController: NavController) {} // Inyecta NavController

    async presentAlert(header: string, message: string, showBackButton: boolean = false) {
        const buttons = showBackButton
            ? [
                {
                    text: 'Volver a Inicio',
                    handler: () => {
                        this.navController.navigateRoot('/home'); // Navega a la página de inicio
                    }
                },
                {
                    text: 'Registrar otro usuario', // Opción de aceptar
                    role: 'cancel'
                }
            ]
            : [
                {
                    text: 'Aceptar',
                    role: 'cancel'
                }
            ];

        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: buttons,
        });
        await alert.present();
    }

    async register() {
        // Inicializa el mensaje en cada intento de registro
        this.mensaje = '';

        // Verificar que todos los campos estén llenos
        if (!this.usuario || !this.nombre || !this.apellido || !this.tipoUsuario || !this.fechaNacimiento || !this.password) {
            this.presentAlert('Error', 'Por favor, rellena todos los campos.');
            this.isSuccess = false;
            return; // Salir si falta algún campo
        }

        // Validar que la contraseña cumpla con el patrón
        const complexPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.,\-!])[a-zA-Z0-9.,\-!]*$/;
        if (!complexPattern.test(this.password)) {
            this.presentAlert('Error', 'La contraseña debe contener al menos una letra, un número y un símbolo.');
            this.isSuccess = false;
            return; // Salir si la contraseña no cumple el patrón
        }

        // Convertir el nombre de usuario a minúsculas
        const user = {
            usuario: this.usuario.toLowerCase(), // Normaliza a minúsculas
            nombre: this.nombre,
            apellido: this.apellido,
            tipoUsuario: this.tipoUsuario,
            fechaNacimiento: this.fechaNacimiento,
            contrasena: this.password,
        };

        console.log('Datos a registrar:', user);
        this.userService.registerUser(user).subscribe({
            next: (response) => {
                console.log('Usuario registrado', response);
                this.presentAlert('Éxito', 'Usuario registrado con éxito', true); // Alerta de éxito con botón de regreso
                this.isSuccess = true; // Indica que la operación fue exitosa
                this.clearForm();
            },
            error: (error) => {
                console.error('Error registrando el usuario', error);
                // Manejar el error de usuario ya existente
                if (error.status === 400) { // Ajusta esto según el código de error de tu API
                    this.presentAlert('Error', 'Ese nombre de usuario ya existe.');
                } else {
                    this.presentAlert('Error', `Error al registrar el usuario: ${error.message || 'Error desconocido'}`);
                }
                this.isSuccess = false; // Indica que hubo un error
            }
        });
    }

    clearForm() {
        this.usuario = '';
        this.nombre = '';
        this.apellido = '';
        this.tipoUsuario = '';
        this.fechaNacimiento = '';
        this.password = '';
    }
}
