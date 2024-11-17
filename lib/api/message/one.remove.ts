import type { DeleteResponse } from '@/lib/api/types-api';
import { useAppStore } from '@/src-preview/state';

export default async function removeOne(id: string): Promise<DeleteResponse> {
	const store = useAppStore();
	const message = store.threadMessages.find((m) => m.id === id);
	if (!message) {
		throw new Error(`message ${id} not found`);
	}
	const newMessages = store.threadMessages.filter((m) => m.id !== id);
	store.setThreadMessages(newMessages);
	return { success: true };
}
