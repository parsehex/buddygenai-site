import type { ChatThread, BuddyVersionMerged } from '@/lib/api/types-db';
import { useAppStore } from '@/src-preview/state';

interface UpdateBuddyOptions {
	id: string;
	name?: string;
	tts_voice?: string;
	description?: string;
	profile_pic?: string;
	profile_pic_prompt?: string;
	profile_pic_use_prompt?: boolean;
	appearance_options?: string;
	selected_appearance_options?: string;
}

export default async function updateOne({
	id,
	name,
	tts_voice,
	description,
	profile_pic,
	profile_pic_prompt,
	profile_pic_use_prompt = true,
	appearance_options,
	selected_appearance_options,
}: UpdateBuddyOptions): Promise<BuddyVersionMerged> {
	const store = useAppStore();
	const buddy = store.buddies.find((b) => b.id === id);
	if (!buddy) {
		throw new Error(`buddy ${id} not found`);
	}
	return buddy;
}
