import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toDataURL } from 'qrcode';

@Component({
  selector: 'app-paginaqr',
  templateUrl: './paginaqr.page.html',
  styleUrls: ['./paginaqr.page.scss'],
})
export class PaginaqrPage implements OnInit {
  qrCodeData: string = '';  // Define qrCodeData here

  constructor(private router: Router) {}

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const timestamp = navigation?.extras.state?.['timestamp'];
    const nombreClase = navigation?.extras.state?.['nombreClase'];
    
    if (timestamp) {
      const data = `Asistencia registrada en la Clase: "${nombreClase}" QR generado a las ${timestamp}`;
      try {
        this.qrCodeData = await toDataURL(data, { errorCorrectionLevel: 'H' });
      } catch (err) {
        console.error('Error al generar el QR:', err);
      }
    }
  }
}
