import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// https://medium.com/@pppped/compute-an-arbitrary-color-for-user-avatar-starting-from-his-username-with-javascript-cd0675943b66
export function textToHslColor(t: string, s: number, l: number) {
	var hash = 0;
	for (var i = 0; i < t.length; i++) {
		hash = t.charCodeAt(i) + ((hash << 5) - hash);
	}

	var h = hash % 360;
	return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

export function isDevMode() {
	return false;
}

export function playAudio(url: string) {
	const audio = new Audio(url);
	audio.playbackRate = 1.15;
	audio.play();
}

export function copyToClipboard(text: string) {
	navigator.clipboard.writeText(text);
}
