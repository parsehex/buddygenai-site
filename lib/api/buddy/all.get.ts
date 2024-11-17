import type { BuddyVersionMerged } from '@/lib/api/types-db';
import buddies from '@/lib/data/buddies.json';

export default async function getAll(): Promise<BuddyVersionMerged[]> {
	// i think we might need another state
	return buddies;
}
