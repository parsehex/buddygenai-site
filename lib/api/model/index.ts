import { getModels } from '../mock';

export default {
	getAll: async function getAllModels(
		type: 'chat' | 'image' | 'tts' | 'whisper'
	): Promise<string[]> {
		return getModels(type);
	},
};
