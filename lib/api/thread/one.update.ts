import type { ChatThread } from '@/lib/api/types-db';
import { useAppStore } from '@/stores/main';

interface UpdateThreadOptions {
	name?: string;
	persona_id?: string;
	mode?: 'persona' | 'custom';
	persona_mode_use_current?: boolean;
}

export default async function updateOne(
	id: string,
	{ name, persona_id, mode, persona_mode_use_current }: UpdateThreadOptions
): Promise<ChatThread> {
	const store = useAppStore();

	const thread = store.threads.find((t) => t.id === id);
	if (!thread) {
		throw new Error('Thread not found');
	}

	if (name) {
		thread.name = name;
		const newThreads = store.threads.map((t) => (t.id === id ? thread : t));
		store.setThreads(newThreads);
	}

	return thread;
}
