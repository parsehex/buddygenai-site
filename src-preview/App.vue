<script setup lang="ts">
import { ref } from 'vue';
import { Toaster } from '@/components/ui/toast';
import { Sidebar } from '@/components/sidebar';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useColorMode } from '@vueuse/core';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

useColorMode();

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
				<div>
					<Alert variant="info" class="p-2 rounded-none">
						<AlertDescription class="text-center">
							This is a preview of BuddyGenAI.
							<br />
							Go to
							<RouterLink to="/">Home Page</RouterLink> ||
							<a href="/">Back to BuddyGenAI.com</a>
						</AlertDescription>
					</Alert>
					<ResizablePanelGroup
						direction="horizontal"
						:style="{
							height: '92vh',
						}"
					>
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
				</div>
			</Suspense>
			<Toaster />
		</TooltipProvider>
	</div>
</template>

<style scoped>
a {
	font-weight: bold;
	text-decoration: underline;
}
</style>
