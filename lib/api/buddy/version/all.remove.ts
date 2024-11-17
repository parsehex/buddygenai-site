import type { DeleteResponse } from '@/lib/api/types-api';

export default async function removeAll(id: string): Promise<DeleteResponse> {
	return { success: true };
}
