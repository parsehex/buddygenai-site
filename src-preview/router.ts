import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router';

import HomeView from './pages/index.vue';

const routes = [{ path: '/', component: HomeView }] as RouteRecordRaw[];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});
