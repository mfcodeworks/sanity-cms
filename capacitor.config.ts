import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  "appId": "com.mfsoftworks.portfolio",
  "appName": "my-portfolio",
  "bundledWebRuntime": false,
  "webDir": "dist",
  "server": {
    "hostname": "localhost",
    "iosScheme": "http",
    "androidScheme": "http"
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000
    }
  }
}

export default config;
