import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    terserOptions: {
      compress: {
        // Behalte eval-Funktionen unverändert
        evaluate: false,
      },
      mangle: {
        // Behalte eval-relevante Namen
        toplevel: true,
        properties: {
          reserved: ['eval']
        }
      }
    }
  },
  // resolve: {
  //   alias: {
  //     '@kooljs': '../../kooljs/kooljs'
  //   }
  // },
  server: {
    fs: {
      allow: ["./"],
    },
  }
})
