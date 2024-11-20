import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Mobile2024',
  webDir: 'www',
  plugins: {
    BarcodeScanner: {
      enableOpacity: true, // Opcional: Deja la cámara visible mientras escaneas
      enableTorch: false,
      cameraDirection: 'back',
    },
    },
};

export default config;
