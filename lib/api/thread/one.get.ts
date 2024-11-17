import type { ChatThread } from '@/lib/api/types-db';
import threads from '@/lib/data/threads.json';

export default async function getOne(id: string): Promise<ChatThread> {
	const thread = threads.find((t) => t.id === id) as ChatThread;

	return thread;
}
