import { getModels } from '../mock';

export default async function getAll(
	type: 'chat' | 'image' | 'tts' | 'whisper'
): Promise<string[]> {
	return getModels(type);
}
