import type { ChatThread, Buddy, BuddyVersion } from '@/lib/api/types-db';

interface CreateThreadOptions {
	name: string;
	persona_id?: string;
	mode: 'persona' | 'custom';
}

export default async function createOne({
	name,
	persona_id,
	mode,
}: CreateThreadOptions): Promise<ChatThread> {
	// TODO
	// get new thread from mock
	// add to store, return

	return {} as ChatThread;
}
