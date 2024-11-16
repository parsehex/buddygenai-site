import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type {
	ChatMessage,
	MergedChatThread,
	BuddyVersionMerged,
	SQLiteVal,
} from './types/db';

// NOTE: This is a copy of the app's store to be used in the preview.
//   Its functionality should all be no-op or mocked.

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

	const chatModels = ref(['fake-gpt-3.5-turbo'] as string[]);
	const imageModels = ref(['fake-dall-e-3'] as string[]);
	const ttsModels = ref(['fake-alloy'] as string[]);
	const whisperModels = ref([] as string[]);

	const buddies = ref<BuddyVersionMerged[]>([
		{
			id: 'fake-buddy',
			created: Date.now(),
			updated: null,
			tts_voice: 'fake-alloy',
			profile_pic: null,
			profile_pic_prompt: null,
			profile_pic_use_prompt: false,
			appearance_options: null,
			selected_appearance_options: null,
			current_version_id: 'fake-buddy-version',
			name: 'Eric',
			description: 'friendly, talkative',
			persona_id: 'fake-persona',
			version: 1,
		},
	]);
	const settings = ref({} as Settings); // TODO
	const threads = ref([] as MergedChatThread[]); // TODO

	const isExternalProvider = computed(() => true);

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
			return { chatModels: await updateChatModels() };
		} else if (certain === 'image') {
			return { imageModels: await updateImageModels() };
		} else if (certain === 'tts') {
			return { ttsModels: await updateTTSModels() };
		} else if (certain === 'whisper') {
			return { whisperModels: await updateWhisperModels() };
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
		// 👍
	};
	const updateThreads = async () => {
		return threads.value;
	};

	watch(
		settings.value,
		async (newVal) => {
			if (firstRun) {
				firstRun = false;
				return;
			}

			console.log('settings changed', newVal);

			await saveSettings(newVal);
		},
		{ deep: true }
	);

	const chatServerRunning = ref(false);
	const chatServerStarting = ref(false);
	const updateChatServerRunning = async () => {
		chatServerRunning.value = true;
	};

	// TODO once started, increase progress every 100ms
	//   until progress is 1, then set generating to false
	const imgGenerating = ref(false);
	const updateImgGenerating = (val: boolean) => {
		imgGenerating.value = val;
	};
	const imgProgress = ref(0);
	const updateImgProgress = (val: number) => {
		imgProgress.value = val;
	};

	// newHere if db is fresh or if there are no threads or buddies
	const newHere = computed(
		() =>
			!!+settings.value.fresh_db ||
			(!threads.value.length && !buddies.value.length)
	);

	const proceed = ref(false);

	// TODO
	const isModelsSetup = computed(() => {
		return true;
	});

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

		updateModels,
		updateBuddies,
		updateSettings,
		saveSettings,
		updateThreads,

		isExternalProvider,
		proceed,
		isModelsSetup,

		chatServerRunning,
		chatServerStarting,
		updateChatServerRunning,

		imgGenerating,
		updateImgGenerating,
		imgProgress,
		updateImgProgress,

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
