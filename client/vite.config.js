import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   'https://localhost:5000/api/v1/': REACT_APP_BASE_URL,
  //   'pk.eyJ1IjoiamFja3M3NyIsImEiOiJja21xOHprcGcybW11MnVzN2M4d3g3MHF1In0.P6kIyvROxfxKvmip0iH27Q': REACT_APP_MAP_TOKEN
  // }
})
