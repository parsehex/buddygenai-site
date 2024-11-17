import type { Buddy, BuddyVersion } from '@/lib/api/types-db';
import { ProfilePicQuality } from '@/lib/api/types-api';

const colors = [
	'light blue',
	'light red',
	'violet',
	'light green',
	'light yellow',
];

export default async function createProfilePic(
	id: string,
	quality?: ProfilePicQuality,
	gender = ''
) {
	return { output: '' };
}
