import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), tsconfigPaths()],
	// base: '/',
	resolve: {
		dedupe: ['vue'],
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname),
			},
		],
	},
	build: {
		rollupOptions: {
			input: {
				index: 'index.html',
				preview: 'preview.html',
			},
		},
	},
});
