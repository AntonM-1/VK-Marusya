import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use 'variables' as *;\n@use 'mixins' as *;\n`,
                loadPaths: [fileURLToPath(new URL('./src/styles/global', import.meta.url))],
            },
        },
    },
})
