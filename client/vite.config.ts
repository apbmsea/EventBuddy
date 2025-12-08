import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
	plugins: [react(), basicSsl()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@app': path.resolve(__dirname, 'src/app'),
			'@entities': path.resolve(__dirname, 'src/entities'),
			'@features': path.resolve(__dirname, 'src/features'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@shared': path.resolve(__dirname, 'src/shared'),
			'@widgets': path.resolve(__dirname, 'src/widgets')
		}
	},
	server: {
		watch: {
			usePolling: true
		},
		host: true,
		strictPort: true,
		port: 3000
	}
});
