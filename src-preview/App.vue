<script setup lang="ts">
import { ref } from 'vue';
import { Toaster } from '@/components/ui/toast';
import { Sidebar } from './sidebar';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useColorMode } from '@vueuse/core';
import { TooltipProvider } from '@/components/ui/tooltip';

useColorMode();

// TODO add strip at top that this is an incomplete preview
// load chat thread(s) in first
// then get chat replay working
//   user starts with no threads
//   user can create a thread based on mock data
//   message inputs are predefined from the thread's data, user can only click to send
//   predefined response is "typed" out
//   repeat until no more messages -- show e.g. "Preview over"

const container = ref<HTMLElement | null>(null);
</script>

<template>
	<div
		ref="container"
		class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950"
	>
		<TooltipProvider>
			<Suspense>
				<ResizablePanelGroup direction="horizontal">
					<ResizablePanel
						class="min-w-min"
						:default-size="22"
						:min-size="20"
						:max-size="35"
					>
						<Sidebar />
					</ResizablePanel>
					<ResizableHandle with-handle />
					<ResizablePanel>
						<RouterView />
					</ResizablePanel>
				</ResizablePanelGroup>
			</Suspense>
			<Toaster />
		</TooltipProvider>
	</div>
</template>

<style>
html,
body {
	@apply h-screen w-screen overflow-y-hidden;
}
.info {
	@apply bg-blue-400 text-white font-bold;
}
.border-info {
	@apply border-blue-700;
}
.info-foreground {
	@apply text-blue-400 bg-white;
}

.success {
	@apply bg-green-400 text-black font-bold;
}
.border-success {
	@apply border-green-700;
}
.success-foreground {
	@apply text-green-400 bg-white;
}

.magic {
	@apply bg-purple-400 text-black font-bold;
}
</style>
