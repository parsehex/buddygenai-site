interface Message {
	role: 'user' | 'assistant';
	content: string;
}

export default async function createMessage(
	threadId: string,
	message: Message,
	image?: string,
	tts?: string
) {
	//
}
