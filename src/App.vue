<template>
	<div class="App">
		<header class="App-header">
			<!-- <div class="App-logo"></div> -->
			<h1
				class="text-4xl font-bold select-none my-2 bg-gray-600 inline-block mt-0 rounded-b px-1"
			>
				<span style="color: #61dafb">BuddyGen</span>
				<span style="color: #111">AI</span>
			</h1>
			<p style="margin: 0; font-style: italic; font-weight: bold">
				Private Access Only
			</p>
		</header>

		<div class="App-body">
			<div>
				<div class="App-body-left-title">
					<!--  -->
				</div>
				<img
					src="/images/buddygen-itchio-cover.png"
					class="mx-auto"
					alt="cover"
				/>
				<p style="max-width: 35%; margin: 1em auto">
					BuddyGen AI is an app for people with no buddies.
					<br />
					It's open source if you can find the repo and build it.
				</p>
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
			<li class="line-through">Speak your messages using voice/microphone</li>
			<li class="line-through">Buddies respond with voice/Text to Speech</li>
			<li class="line-through">
				Buddies send picture(s) along with their message
			</li>
			<li>Options to easily customize your Buddy's behavior</li>
			<li>Better PC support</li>
			<li>Support for Linux, Mac</li>
			<li>
				Buddies have memory of their other chats and can learn facts about you
			</li>
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
	'/images/EHQjjn.png',
	'/images/buddy list.png',
	'/images/JJUK2v.png',
	// '/images/cover.png',
	// '/images/chat.png',
	// '/images/setup - 4 result.png',
];
</script>

<style>
html,
body {
	background-color: #030712;
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
