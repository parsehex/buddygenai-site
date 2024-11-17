export default async function updateOne(
	id: string,
	content?: string,
	image?: string,
	tts?: string
) {
	return { status: 'success', message: 'Message content updated successfully' };
}
