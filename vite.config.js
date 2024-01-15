import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";
const manifestForPlugIn = {
  registerType:'prompt',
  includeAssests:['favicon.ico', "apple-touc-icon.png", "vite.svg"],
  manifest: {
  short_name: "Chat GPT",
  name: "AI App",
  icons: [
    {
      "src": "manifest-icon-192.maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "manifest-icon-192.maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "manifest-icon-512.maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "manifest-icon-512.maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  start_url: ".",
  display: "standalone",
  theme_color: "#000000",
  background_color: "#ffffff"
}

}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VitePWA(manifestForPlugIn)],
})