<template>
	<div class="App mt-4">
		<header class="App-header">
			<div class="App-logo"></div>
			<h1 class="text-4xl font-bold select-none my-2">
				<span style="color: #61dafb">BuddyGen</span>
				<span style="color: #111">AI</span>
			</h1>
		</header>

		<div class="App-body">
			<div>
				<div class="App-body-left-title">
					<!--  -->
				</div>
			</div>
		</div>
		<br />
		<h2>Gallery</h2>
		<br />
		<Carousel class="relative w-full max-w-xmd">
			<CarouselPrevious class="relative" />
			<CarouselNext class="relative" />
			<CarouselContent>
				<CarouselItem v-for="(pic, index) in pics" :key="index">
					<div class="p-1">
						<Card class="bg-gray-800 w-full h-full">
							<CardContent
								class="flex aspect-auto items-center justify-center p-2"
							>
								<img :src="pic" alt="cover" />
							</CardContent>
						</Card>
					</div>
				</CarouselItem>
			</CarouselContent>
		</Carousel>
		<br />
		<h2 style="margin-bottom: 0" class="text-2xl">Road Map</h2>
		<p
			style="
				text-align: center;
				max-width: 35%;
				margin: 1em auto;
				font-style: italic;
				font-weight: bold;
			"
		>
			Listed features are not in order or guaranteed.
		</p>
		<ul
			style="
				text-align: center;
				margin: 0 auto;
				max-width: 35%;
				list-style-type: square;
			"
		>
			<li>Speak your messages using voice/microphone</li>
			<li>Buddies respond with voice/Text to Speech</li>
			<li>Buddies send picture(s) along with their message</li>
			<li>Options to easily customize your Buddy's behavior</li>
			<li>Better PC support + add support for Linux, Mac</li>
			<li>Buddies have memory of their other chats</li>
			<li>Buddy consistency/quality</li>
			<li>Better/easier model management</li>
			<li>Play game(s) with your Buddy</li>
		</ul>
	</div>
	<p style="text-align: center; padding: 10px; text-align: center">
		Copyright © 2024 Thomas Mays
	</p>
</template>

<script setup lang="ts">
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '../components/ui/carousel';
import { Card, CardContent } from '../components/ui/card';

const pics = [
	'/images/home page.png',
	'/images/dark mode.png',
	'/images/buddy list.png',
	// '/images/cover.png',
	// '/images/chat.png',
	// '/images/setup - 4 result.png',
];
</script>

<style>
html,
body {
	background-color: #282c34;
	color: #dcdcdc;
}

.App {
	text-align: center;
	padding-bottom: 50px;
}

.App-logo {
	background-image: url('./logo.png');
	background-size: contain;
	/* background-color: lightgray; */
	/* use better light gray */
	background-color: #f0f0f0;
	width: 350px;
	height: 350px;
	pointer-events: none;
	margin: 0.5em auto;
	padding: 20px;
	border-radius: 15%;
}

.App-body-left-title {
	display: flex;
	flex-direction: column;
}
</style>
