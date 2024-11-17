<script setup lang="ts">
import { ref, computed } from 'vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion } from '@/components/ui/accordion';

import GeneralOptions from './GeneralOptions.vue';
import ImageAIOptions from './ImageAIOptions.vue';
import TTSOptions from './TTSOptions.vue';
import STTOptions from './STTOptions.vue';

const hasTTS = computed(() => true);
const hasSTT = computed(() => false);

const error = ref('');

const reloadPage = () => {
	window.location.reload();
};
</script>

<template>
	<!--
		TODO
		- add option: Advanced -- show advanced options
			- Just have a map of which settings are advanced, conditionally hide (do it in optionselect?)
			- if enabled, hide:
				- global model import
				- models if # of all models === 1 (not default voice / selected_model_tts)
		- (unrelated) add option to Buddies to specify a certain chat model
		-   if the currently active model is not the one specified, switch to it and restart server
	 -->
	<ScrollArea class="h-screen pb-12">
		<Alert v-if="error" variant="destructive">
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{{ error }}</AlertDescription>
		</Alert>
		<Accordion class="px-2" type="multiple" collapsible>
			<GeneralOptions />
			<ImageAIOptions />
			<TTSOptions v-if="hasTTS" />
			<STTOptions v-if="hasSTT" />
		</Accordion>
		<div class="mt-4 flex flex-col items-center">
			<Button
				type="button"
				@click="reloadPage"
				class="px-4 py-2 rounded-md"
				variant="ghost"
				>Reload Page</Button
			>
			<RouterLink to="/credits">App Credits</RouterLink>
		</div>
	</ScrollArea>
</template>

<style lang="scss"></style>
