import buddies from '@/lib/data/buddies.json';
import models from '@/lib/data/models.json';
import settings from '@/lib/data/settings.json';
import threads from '@/lib/data/threads.json';
import { useAppStore } from '@/src-preview/state';

// the goal here is to use the predefined data in the json files to
//   simulate the populating of the store

// the store will start out blank
// when the user interacts with the app, we'll add data to the store
//   incrementally from the mock data to simulate the app's behavior
// so, when the user goes to create a buddy, we'll take one from the json file
//   and add it to the store, possibly with a mid-step or other mod for the Create page to work

// const store = useAppStore();

// so what should this file do?
// have functions to pop new data? so like, grabNewBuddy, grabNewThread, grabNewMessage
//   we could have it compare to the current store and only return new data
//   that way we can use grab* funcs in components to show the "locked-in" data before it gets added to the store (and thus won't be returned again)

export function getModels(
	type: 'chat' | 'image' | 'tts' | 'whisper'
): string[] {
	const res = models[type];
	if (!res) {
		console.warn(`no ${type} models found`);
		return [];
	}
	return res;
}
