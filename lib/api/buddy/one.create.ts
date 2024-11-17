import type { BuddyVersionMerged } from '@/lib/api/types-db';
import buddies from '@/lib/data/buddies.json';
import { useAppStore } from '@/stores/main';

interface CreateBuddyOptions {
	name: string;
	tts_voice?: string;
	description?: string;
	profile_pic?: string;
	profile_pic_prompt?: string;
	profile_pic_use_prompt?: boolean;
	appearance_options?: string;
	selected_appearance_options?: string;
}

// this is a no-op function that simply adds a buddy to the store from the pre-defined buddies.json file

export default async function createOne({
	name,
	tts_voice = '',
	description,
	profile_pic,
	profile_pic_prompt,
	profile_pic_use_prompt = true,
	appearance_options,
	selected_appearance_options,
}: CreateBuddyOptions): Promise<BuddyVersionMerged> {
	const store = useAppStore();

	// is store missing any buddies from the json file?
	// if so, add one
	const storeBuddies = Array.from(store.buddies.values());
	const jsonBuddies = buddies;
	if (storeBuddies.length < jsonBuddies.length) {
		// add another
		const newBuddy = jsonBuddies[storeBuddies.length];
		store.buddies.push(newBuddy);
		name = newBuddy.name;
	} else {
		// return latest buddy
		const latestBuddy = storeBuddies[storeBuddies.length - 1];
		return latestBuddy;
	}

	const buddy = store.buddies.find((b) => b.name === name);
	if (!buddy) {
		throw new Error(`buddy ${name} not found`);
	}

	return buddy;
}
