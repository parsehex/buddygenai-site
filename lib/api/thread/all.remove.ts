import type { DeleteResponse } from '../types-api';
import { useAppStore } from '@/stores/main';

export default async function removeAllThreads(
	buddy_id: string
): Promise<DeleteResponse> {
	const store = useAppStore();

	const threads = Array.from(store.threads.values());
	const newThreads = threads.filter((t) => t.persona_id !== buddy_id);
	store.setThreads(newThreads);

	return { success: true };
}
