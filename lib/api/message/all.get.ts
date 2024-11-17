import type {
	ChatMessage,
	ChatThread,
	Buddy,
	BuddyVersion,
} from '@/lib/api/types-db';
import threads from '@/lib/data/threads.json';

export default async function getAll(threadId: string): Promise<ChatMessage[]> {
	const thread = threads.find((t) => t.id === threadId) as ChatThread;
	if (!thread) {
		throw new Error(`thread ${threadId} not found`);
	}
	// @ts-ignore
	return thread.messages;
}
