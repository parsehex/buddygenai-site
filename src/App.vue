<template>
	<div class="App mt-4">
		<header class="App-header">
			<div class="App-logo"></div>
			<h1 class="text-4xl font-bold select-none">
				<span style="color: #61dafb">BuddyGen</span>
				<span style="color: #111">AI</span>
			</h1>
		</header>

		<div class="App-body">
			<div>
				<div class="App-body-left-title">
					<a
						href="https://github.com/parsehex/BuddyGenAI/releases/tag/v0.1.0-beta"
						target="_blank"
						class="text-lg underline text-gray-400"
					>
						v0.1.0-beta - Demo Release
					</a>
					<br />
					<a
						href="https://github.com/parsehex/BuddyGenAI/blob/main/docs/how-to-setup.md"
						target="_blank"
						class="underline text-gray-400"
					>
						How to setup app
					</a>
				</div>
			</div>
		</div>
		<br />
		<h2 style="color: #dcdcdc">Gallery</h2>
		<br />
		<!-- <Carousel>
			<CarouselPrevious />
			<CarouselNext />
			<CarouselContent>
				<CarouselItem class="md:basis-1/2 lg:basis-1/3">
					<img src="./images/cover.png" alt="cover" />
					<img src="./images/chat.png" alt="chat" />
					<img src="./images/setup - 4 result.png" alt="setup" />
				</CarouselItem>
			</CarouselContent>
		</Carousel> -->
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
								<!-- <span class="text-4xl font-semibold">{{ index + 1 }}</span> -->
								<img :src="pic" alt="cover" />
							</CardContent>
						</Card>
					</div>
				</CarouselItem>
			</CarouselContent>
		</Carousel>
		<br />
		<h2 style="color: #dcdcdc; margin-bottom: 0" class="text-2xl">Road Map</h2>
		<p
			style="
				color: #dcdcdc;
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
				color: #dcdcdc;
				text-align: center;
				margin: 0 auto;
				max-width: 35%;
				list-style-type: square;
			"
		>
			<li>Speak your messages using voice/microphone</li>
			<li>Buddies respond with voice/Text-To-Speech</li>
			<li>Buddies send picture(s) along with their message</li>
			<li>Options to easily customize your Buddy's behavior</li>
			<li>Better PC support - add support for Linux, Mac</li>
			<li>Buddies have memory of their other chats</li>
			<li>Buddy consistency/quality</li>
			<li>Better/easier model management</li>
		</ul>
	</div>
	<p
		style="
			text-align: center;
			padding: 10px;
			background-color: #282c34;
			color: #dcdcdc;
			text-align: center;
		"
	>
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
	'/images/cover.png',
	'/images/chat.png',
	'/images/setup - 4 result.png',
];
</script>

<style>
html,
body {
	background-color: #282c34;
}

.App {
	text-align: center;
	padding-bottom: 50px;
}

.App-logo {
	background-image: url('./logo.png');
	background-size: contain;
	width: 350px;
	height: 350px;
	pointer-events: none;
	border-radius: 50%;
	margin: 0 auto;
}

.App-body-left-title {
	display: flex;
	flex-direction: column;
}
</style>
