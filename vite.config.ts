import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    //env varible form .env file
    VITE_apiKey: JSON.stringify(process.env.VITE_apiKey),
    VITE_authDomain: JSON.stringify(process.env.VITE_authDomain),
    VITE_projectId: JSON.stringify(process.env.VITE_projectId),
    VITE_storageBucket: JSON.stringify(process.env.VITE_storageBucket),
    VITE_messagingSenderId: JSON.stringify(process.env.VITE_messagingSenderId),
    VITE_appId: JSON.stringify(process.env.VITE_appId)
  }
})
