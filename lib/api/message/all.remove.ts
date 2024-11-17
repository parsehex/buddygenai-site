import type { DeleteResponse } from '@/lib/api/types-api';
import { useAppStore } from '@/src-preview/state';

export default async function removeAll(
	threadId: string
): Promise<DeleteResponse> {
	const store = useAppStore();
	store.setThreadMessages([]);
	return { success: true };
}
