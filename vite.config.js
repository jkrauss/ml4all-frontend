import {svelte} from '@sveltejs/vite-plugin-svelte';
import {defineConfig} from 'vite';
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
    server: {
        port: 5000,
    },
    plugins: [svelte(), VitePWA()],
});