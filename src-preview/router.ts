import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router';

import HomeView from './pages/index.vue';
import Credits from './pages/credits.vue';

const routes = [
	{ path: '/', component: HomeView },
	{ path: '/credits', component: Credits },
] as RouteRecordRaw[];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});
