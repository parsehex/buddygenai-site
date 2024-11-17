<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/main';
import type { ChatThread } from '@/lib/api/types-db';
import { api } from '@/lib/api';
import { router } from '@/lib/router';

const route = useRoute();
const isThreadSelected = (threadId: string) =>
	route.path.includes(`/chat`) && route.params.id === threadId;

const { updateThreads } = useAppStore();
const store = useAppStore();

const editingThreadName = ref('');
const rightClickedId = ref('');

onBeforeMount(async () => {
	await updateThreads();
});

const renameClicked = (threadId: string) => {
	const thread = store.threads.find(
		(thread: ChatThread) => thread.id === threadId
	);
	if (!thread) {
		console.error(`Couldn't find thread with id ${threadId} to rename`);
		editingThreadName.value = '';
		return;
	}
	editingThreadName.value = thread.name;
};
const handleRename = async () => {
	if (!editingThreadName.value) return;

	await api.thread.updateOne(rightClickedId.value, {
		name: editingThreadName.value,
	});
	editingThreadName.value = '';

	await updateThreads();
};

const doDeleteThread = async (threadId: string) => {
	console.log('deleting thread', threadId);
	await api.thread.removeOne(threadId);

	const newThreads = await updateThreads();
	if (route.params.id === threadId) {
		const newThread = newThreads[0];
		if (newThread) {
			router.push(`/chat/${newThread.id}`);
		} else {
			router.push(`/`);
		}
	}
};

const goToThread = async (threadId: string) => {
	router.push(`/chat/${threadId}`);
	const thread = store.threads.find(
		(thread: ChatThread) => thread.id === threadId
	);
	if (!thread) {
		console.error(`Couldn't find thread with id ${threadId} to go to`);
		return;
	}

	// @ts-ignore
	const messages = thread.messages || [];
	if (!messages) return;
	console.log('setting thread messages', messages);
	store.setThreadMessages(messages);

	await router.push(`/chat/${threadId}`);
};
</script>

<template>
	<ul class="pb-[150px]">
		<Dialog>
			<ContextMenu>
				<ContextMenuTrigger>
					<li
						v-for="thread in store.threads"
						:key="thread.id"
						:class="[
							'cursor-pointer',
							'hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors',
							'rounded',
							'border-b-2',
							isThreadSelected(thread.id)
								? 'font-bold bg-gray-200 dark:bg-gray-800'
								: '',
						]"
						@contextmenu="rightClickedId = thread.id"
					>
						<!-- <RouterLink :to="`/chat/${thread.id}`" class="block p-2">
							{{ thread.name }}
						</RouterLink> -->
						<div @click="goToThread(thread.id)" class="block p-2">
							{{ thread.name }}
						</div>
					</li>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<!-- TODO fix to not use selected thread -->
					<DialogTrigger asChild>
						<ContextMenuItem @click="renameClicked(rightClickedId)">
							Rename
						</ContextMenuItem>
					</DialogTrigger>
					<ContextMenuItem @click="doDeleteThread(rightClickedId)">
						Delete
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Name</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					<Input v-model="editingThreadName" placeholder="Thread name" />
				</DialogDescription>
				<DialogFooter>
					<DialogClose as-child>
						<Button @click="handleRename" type="button">Confirm</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	</ul>
</template>
