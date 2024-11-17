import type {
	ChatMessage,
	ChatThread,
	Buddy,
	BuddyVersion,
} from '@/lib/api/types-db';
import { AppSettings } from '@/lib/api/AppSettings';
import { useAppStore } from '@/src-preview/state';

export default async function getAll(threadId: string): Promise<ChatMessage[]> {
	const store = useAppStore();
	const thread = store.threads.find((t) => t.id === threadId);
	if (!thread) {
		throw new Error(`thread ${threadId} not found`);
	}
	// @ts-ignore
	return thread.messages;
}
