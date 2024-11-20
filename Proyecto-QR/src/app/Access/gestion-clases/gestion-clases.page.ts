import { Component, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/services/clase.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-gestion-clases',
  templateUrl: './gestion-clases.page.html',
  styleUrls: ['./gestion-clases.page.scss'],
})
export class GestionClasesPage implements OnInit {
  clases: any[] = [];
  nuevaClase: string = '';

  constructor(
    private claseService: ClaseService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.cargarClases();
  }

  cargarClases() {
    this.claseService.getClases().subscribe(
      (data) => {
        this.clases = data;
      },
      (error) => {
        console.error('Error al cargar clases:', error);
      }
    );
  }

  agregarClase() {
    if (this.nuevaClase.trim()) {
      this.claseService.addClase(this.nuevaClase).subscribe(
        async () => {
          this.nuevaClase = '';
          this.cargarClases();
          const toast = await this.toastCtrl.create({
            message: 'Clase agregada correctamente',
            duration: 2000,
            color: 'success',
          });
          toast.present();
        },
        async (error) => {
          console.error('Error al agregar clase:', error);
        }
      );
    }
  }

  async eliminarClase(idClase: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar esta clase?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.claseService.deleteClase(idClase).subscribe(() => {
              this.cargarClases();
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
