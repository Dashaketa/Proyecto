import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  // Propiedades para almacenar los datos del usuario
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  isScanning: boolean = false; // Indicar si el escaneo está en progreso
  scannedContent: string | null = null; // Almacenar el contenido escaneado

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  // Cargar los datos del usuario pasados desde la página de perfil
  loadUserData() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    if (state && state['user']) {
      const user = state['user'];
      this.username = user.username;
      this.nombre = user.nombre;
      this.apellido = user.apellido;
    } else {
      console.warn('No se recibieron datos del usuario.');
    }
  }

  // Función para iniciar el escaneo del QR
  async startScan() {
    try {
      const permission = await BarcodeScanner.checkPermission({ force: true });

      if (!permission.granted) {
        const alert = await this.alertCtrl.create({
          header: 'Permiso necesario',
          message: 'Debes otorgar permisos de cámara para escanear el QR.',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }

      this.isScanning = true; // Empezamos el escaneo

      // Iniciar el escaneo
      await BarcodeScanner.hideBackground();  // Ocultar el fondo
      const result = await BarcodeScanner.startScan();  // Empezar el escaneo

      if (result.hasContent) {
        this.scannedContent = result.content; // Guardar el contenido escaneado

        console.log('QR escaneado:', result.content);

        if (result.content.includes('Asistencia registrada')) {
          // Si el QR contiene el mensaje de asistencia registrada
          const timestamp = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' }); // Fecha y hora en la zona horaria de Chile
          const body = `
            Asistencia registrada para:
            - Username: ${this.username}
            - Nombre: ${this.nombre}
            - Apellido: ${this.apellido}
            - Fecha y Hora de Registro: ${timestamp}
            ${this.scannedContent}
          `;

          // Construir el URI de mailto
          const mailtoURI = `mailto:mart.salasm@duocuc.cl?subject=Asistencia%20registrada&body=${encodeURIComponent(body)}`;

          // Abrir el correo utilizando el URI
          window.open(mailtoURI, '_blank');
        }
      } else {
        const alert = await this.alertCtrl.create({
          header: 'QR no válido',
          message: 'No se detectó un QR válido.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } catch (error) {
      console.error('Error al escanear el QR:', error);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Hubo un problema al escanear el QR.',
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      this.isScanning = false; // Detenemos el escaneo al finalizar
    }
  }

  // Función para detener el escaneo
  async stopScan() {
    await BarcodeScanner.stopScan(); // Detener el escaneo
    await BarcodeScanner.showBackground(); // Mostrar el fondo nuevamente
    this.isScanning = false; // Detenemos el estado de escaneo
  }
}
