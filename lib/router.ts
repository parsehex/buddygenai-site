import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router';

import HomeView from '@/src-preview/pages/index.vue';
import Credits from '@/src-preview/pages/credits.vue';
import Chat from '@/src-preview/pages/chat.vue';

const routes = [
	{ path: '/', component: HomeView },
	{ path: '/chat/:id', component: Chat },
	{ path: '/credits', component: Credits },
] as RouteRecordRaw[];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});
