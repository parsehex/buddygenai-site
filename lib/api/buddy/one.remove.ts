import type { DeleteResponse } from '@/lib/api/types-api';
import { useAppStore } from '@/src-preview/state';

export default async function removeOne(id: string): Promise<DeleteResponse> {
	const store = useAppStore();
	const buddy = store.buddies.find((b) => b.id === id);
	if (!buddy) {
		throw new Error(`buddy ${id} not found`);
	}
	const newBuddies = store.buddies.filter((b) => b.id !== id);
	store.setBuddies(newBuddies);
	return { success: true };
}
