import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
        envPrefix: 'VITE_'
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
        envPrefix: 'VITE_'
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src')
            }
        },
        plugins: [react()],
        envPrefix: 'VITE_'
    }
})
