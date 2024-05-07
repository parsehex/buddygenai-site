<template>
	<div class="App">
		<header class="App-header">
			<div class="App-logo"></div>
			<h1 style="user-select: none">
				<span style="color: #61dafb">BuddyGen</span>
				<span style="color: #111">AI</span>
			</h1>
		</header>

		<div class="App-body">
			<div class="App-body-left">
				<div class="App-body-left-title">
					<a
						href="https://github.com/parsehex/BuddyGenAI/blob/main/docs/how-to-setup.md"
						target="_blank"
						style="color: #dcdcdc; font-size: 1.5rem"
					>
						How to setup app
					</a>
				</div>
			</div>
		</div>
		<br />
		<img src="./cover.png" alt="cover" style="width: 75%" />
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
import './App.css';
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
