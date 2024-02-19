import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fecom.app',
  appName: 'fecom',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
