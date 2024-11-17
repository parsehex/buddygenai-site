<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { formatDistanceToNow } from 'date-fns';
import { ref, onMounted, computed } from 'vue';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { MergedChatThread } from '@/lib/api/types-db';
import BuddyAvatar from '@/components/BuddyAvatar.vue';
import { useAppStore } from '../../stores/main';

const store = useAppStore();
const { buddies, settings, threads } = storeToRefs(store);

const userNameValue = ref(
	settings.value.user_name === 'User' ? '' : settings.value.user_name
);

if (settings.value.user_name && settings.value.user_name !== 'User') {
	userNameValue.value = settings.value.user_name;
}

const MaxMessageLength = 150;
const getMessageContent = (thread: MergedChatThread) => {
	if (thread.latest_message?.content.length > MaxMessageLength) {
		return thread.latest_message?.content.slice(0, MaxMessageLength) + '...';
	}
	return thread.latest_message?.content;
};

const getMessageTime = (thread: MergedChatThread) => {
	if (thread.latest_message) {
		return formatDistanceToNow(new Date(thread.latest_message.created), {
			addSuffix: true,
		});
	}
	return '';
};

const userInitials = computed(() => {
	if (userNameValue.value) {
		return userNameValue.value[0].toUpperCase();
	}
	return '';
});

const sortedThreads = computed(() => {
	return threads.value.sort((a, b) => {
		if (!a.latest_message || !b.latest_message) {
			return 0;
		}
		return (
			new Date(b.latest_message.created).getTime() -
			new Date(a.latest_message.created).getTime()
		);
	});
});
</script>

<template>
	<div v-if="threads.length" class="flex flex-col items-center px-4">
		<h1 class="text-xl font-bold mb-2">
			<div class="underline inline dark:bg-gray-600 p-1 rounded cursor-default">
				<span style="color: #61dafb">BuddyGen</span>
				<span style="color: #111">AI</span>
			</div>
		</h1>
		<div class="flex flex-col items-center gap-2">
			<h2 class="text-lg">Your Chats</h2>
			<div class="flex flex-col items-center gap-1">
				<ScrollArea class="h-screen pb-20">
					<Card
						v-for="thread in sortedThreads"
						:key="thread.id"
						class="w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mb-1"
					>
						<RouterLink
							:to="`/chat/${thread.id}`"
							class="w-full h-full flex items-center justify-start p-4"
						>
							<div>
								<BuddyAvatar
									v-if="thread.selected_buddy"
									:style="{
										visibility:
											thread.latest_message?.role !== 'user'
												? 'visible'
												: 'hidden',
									}"
									:buddy="thread.selected_buddy"
									size="base"
								/>
								<Avatar v-else size="base">
									<AvatarFallback>AI</AvatarFallback>
								</Avatar>
								<Avatar v-if="thread.latest_message?.role === 'user'">
									<AvatarFallback>{{ userInitials }}</AvatarFallback>
								</Avatar>
							</div>
							<div class="ml-2">
								<p class="flex items-baseline">
									<span>
										{{ thread.name }}
									</span>
									<span class="text-xs text-gray-500 italic ml-2">
										{{ getMessageTime(thread) }}
									</span>
								</p>
								<p
									v-if="thread.latest_message"
									class="text-sm mt-2"
									:style="{
										visibility:
											thread.latest_message.role !== 'system'
												? 'visible'
												: 'hidden',
									}"
								>
									{{ getMessageContent(thread) }}
								</p>
							</div>
						</RouterLink>
					</Card>
				</ScrollArea>
			</div>
		</div>
	</div>

	<p v-if="!threads.length && buddies.length" class="text-center mt-4">
		You have no chats yet. Create one to get started!
	</p>
</template>
