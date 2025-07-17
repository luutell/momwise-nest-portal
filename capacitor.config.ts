import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e1e9fc3ba68140e7b58b2349ce277ad1',
  appName: 'momwise-nest-portal',
  webDir: 'dist',
  server: {
    url: 'https://e1e9fc3b-a681-40e7-b58b-2349ce277ad1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#F5F1EB",
      showSpinner: false
    }
  }
};

export default config;