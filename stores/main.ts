import { defineStore } from 'pinia';
import { ref, computed, watch, onBeforeMount } from 'vue';
import type {
	ChatMessage,
	ChatThread,
	MergedChatThread,
	BuddyVersionMerged,
	SQLiteVal,
} from '@/lib/api/types-db';
import { api } from '@/lib/api';
import buddiesData from '@/lib/data/buddies.json';
import modelsData from '@/lib/data/models.json';
import threadsData from '@/lib/data/threads.json';
import settingsData from '@/lib/data/settings.json';

type Provider = 'external' | 'local' | 'custom';
interface Settings {
	user_name: string;
	local_model_directory: string;
	selected_provider_chat: Provider;
	selected_provider_image: Provider;
	selected_model_chat: string;
	selected_model_image: string;
	selected_model_tts: string;
	selected_model_whisper: string;
	gpu_enabled_chat: number;
	gpu_enabled_image: number;
	gpu_enabled_whisper: number;
	chat_image_enabled: number;
	chat_image_quality: string;
	external_api_key: string;
	fresh_db: number;
	n_gpu_layers: number;
	auto_send_stt: number;
	auto_read_chat: number;
	auto_start_server: number;
	skip_start_dialog: number;
}

let firstRun = true;
export const useAppStore = defineStore('app', () => {
	const selectedBuddyId = ref<string>('');
	const threadMessages = ref<ChatMessage[]>([]);
	const setThreadMessages = (messages: ChatMessage[]) => {
		threadMessages.value.length = 0;
		threadMessages.value.push(...messages);
	};

	const chatModels = ref(modelsData.chat as string[]);
	const imageModels = ref(modelsData.image as string[]);
	const ttsModels = ref(modelsData.tts as string[]);
	const whisperModels = ref(modelsData.whisper as string[]);
	const buddies = ref(buddiesData as BuddyVersionMerged[]);
	const settings = ref(settingsData as Settings);
	const threads = ref(threadsData as MergedChatThread[]);

	const isExternalProvider = computed(() => true);

	// onBeforeMount(async () => {
	// 	const [cM, iM, tM, wM, p, s, t] = await Promise.all([
	// 		api.model.getAll('chat'),
	// 		api.model.getAll('image'),
	// 		api.model.getAll('tts'),
	// 		api.model.getAll('whisper'),
	// 		api.buddy.getAll(),
	// 		api.setting.getAll(),
	// 		api.thread.getAll(),
	// 	]);

	// 	if (cM) {
	// 		chatModels.value.length = 0;
	// 		chatModels.value.push(...cM);
	// 	}
	// 	if (iM) {
	// 		imageModels.value.length = 0;
	// 		imageModels.value.push(...iM);
	// 	}
	// 	if (p) {
	// 		buddies.value.length = 0;
	// 		buddies.value.push(...p);
	// 	}
	// 	if (s) Object.assign(settings.value, s);
	// 	if (t) {
	// 		threads.value.length = 0;
	// 		threads.value.push(...t);
	// 	}
	// });

	// we might not need these update funcs
	// i think we'll just be directly updating the state here
	//   so we won't need to get updated data from the non-existent db
	const updateChatModels = async () => {
		return chatModels.value;
	};
	const updateImageModels = async () => {
		return imageModels.value;
	};
	const updateTTSModels = async () => {
		return ttsModels.value;
	};
	const updateWhisperModels = async () => {
		return whisperModels.value;
	};
	const updateModels = async (
		certain?: 'chat' | 'image' | 'tts' | 'whisper'
	) => {
		if (certain === 'chat') {
			const res = await updateChatModels();
			return { chatModels: res };
		} else if (certain === 'image') {
			const res = await updateImageModels();
			return { imageModels: res };
		} else if (certain === 'tts') {
			const res = await updateTTSModels();
			return { ttsModels: res };
		} else if (certain === 'whisper') {
			const res = await updateWhisperModels();
			return { whisperModels: res };
		}
		const [chat, image, tts, whisper] = await Promise.all([
			updateChatModels(),
			updateImageModels(),
			updateTTSModels(),
			updateWhisperModels(),
		]);

		return {
			chatModels: chat,
			imageModels: image,
			ttsModels: tts,
			whisperModels: whisper,
		};
	};
	const updateBuddies = async () => {
		return buddies.value;
	};
	const updateSettings = async () => {
		return settings.value;
	};
	const saveSettings = async (newVal: Record<string, SQLiteVal>) => {
		//
	};
	const updateThreads = async () => {
		return threads.value;
	};

	const chatServerRunning = ref(false);
	const chatServerStarting = ref(false);
	const updateChatServerRunning = async () => {
		chatServerRunning.value = true;
	};

	// newHere if db is fresh or if there are no threads or buddies
	const newHere = computed(() => false);

	const proceed = ref(false);
	const isModelsSetup = computed(() => true);

	const modelProvider = computed({
		get: () => {
			// should be the same for both
			return settings.value.selected_provider_chat;
		},
		set: (value) => {
			settings.value.selected_provider_chat = value;
			settings.value.selected_provider_image = value;
		},
	});

	const imgGenerating = ref(false);
	const updateImgGenerating = (val: boolean) => {
		imgGenerating.value = val;
	};
	const imgProgress = ref(0);
	const updateImgProgress = (val: number) => {
		imgProgress.value = val;
	};

	return {
		selectedBuddyId,
		threadMessages,
		setThreadMessages,
		chatModels,
		imageModels,
		ttsModels,
		whisperModels,
		buddies,
		settings,
		threads,
		newHere,
		modelProvider,
		imgGenerating,
		updateImgGenerating,
		imgProgress,
		updateImgProgress,

		updateModels,
		updateBuddies,
		updateSettings,
		saveSettings,
		updateThreads,

		setThreads: (newThreads: MergedChatThread[]) => {
			threads.value.length = 0;
			threads.value.push(...newThreads);
		},
		setBuddies: (newBuddies: BuddyVersionMerged[]) => {
			buddies.value.length = 0;
			buddies.value.push(...newBuddies);
		},

		isExternalProvider,
		proceed,
		isModelsSetup,

		chatServerRunning,
		chatServerStarting,
		updateChatServerRunning,

		toggleAutoStartServer: () => {
			settings.value.auto_start_server = settings.value.auto_start_server
				? 0
				: 1;
		},
		toggleAutoReadChat: () => {
			settings.value.auto_read_chat = settings.value.auto_read_chat ? 0 : 1;
		},
		toggleAutoReadSTT: () => {
			settings.value.auto_send_stt = settings.value.auto_send_stt ? 0 : 1;
		},
	};
});
