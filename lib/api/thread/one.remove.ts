import type { DeleteResponse } from '@/lib/api/types-api';
import { api } from '@/lib/api';
import { useAppStore } from '@/stores/main';

export default async function removeOne(id: string): Promise<DeleteResponse> {
	const store = useAppStore();

	await api.message.removeAll(id);

	const threads = Array.from(store.threads.values());
	const newThreads = threads.filter((t) => t.id !== id);
	store.setThreads(newThreads);

	return { success: true };
}
