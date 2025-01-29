<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
    <!-- Navigation -->
    <nav class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img src="/images/logo.png" alt="BuddyGenAI Logo" class="h-8 w-8 mr-2" />
          <span class="text-xl font-bold">BuddyGenAI</span>
        </div>
        <div class="flex items-center space-x-4">
          <!-- <a href="https://docs.buddygenai.com" class="hover:text-primary">Docs</a> -->
          <Button asChild>
            <a href="https://github.com/parsehex/BuddyGenAI" target="_blank" class="font-semibold">
              GitHub →
            </a>
          </Button>
        </div>
      </div>
    </nav>


    <!-- Hero Section -->
    <section class="container mx-auto px-6 py-16 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Everyone needs a buddy.
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Design and chat with personalized AI buddies. Bring your characters to life with the power of language models.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <a href="https://app.buddygenai.com">Try it Now</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
        <div class="relative">
					<Carousel class="w-full">
						<CarouselContent>
							<CarouselItem v-for="(pic, index) in pics" :key="index">
								<div class="p-1">
									<div class="relative aspect-square rounded-xl overflow-hidden">
										<img
											:src="pic"
											:alt="`Screenshot ${index + 1}`"
											class="object-cover w-full h-full"
										/>
										<!-- <img
											:src="pic"
											:alt="`Screenshot ${index + 1}`"
											class="object-cover w-full h-full cursor-pointer"
											@click="openLightbox(pic)"
										/> -->
									</div>
								</div>
							</CarouselItem>
						</CarouselContent>
						<!-- <CarouselPrevious class="carousel-button left-4" />
						<CarouselNext class="carousel-button right-4" /> -->
					</Carousel>
				</div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="container mx-auto px-6 py-16">
      <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Custom Characters</CardTitle>
          </CardHeader>
          <CardContent>
            Create and customize AI buddies with unique personalities, backgrounds, and traits.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Natural Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            Engage in fluid, context-aware chats powered by advanced language models.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Privacy First</CardTitle>
          </CardHeader>
          <CardContent>
            All data stored locally in your browser using IndexedDB for maximum privacy.
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Early Access Notice -->
    <section class="container mx-auto px-6 py-16">
      <Card class="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Early Release Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <p>
              BuddyGenAI is an early release project with the following features and considerations:
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>OpenRouter account is required to use chat</li>
              <li>Local browser storage using IndexedDB</li>
              <li>Profile picture generation coming soon</li>
              <li>Support for local AI models in development</li>
            </ul>
            <Alert>
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>
                <p>As this is an early release, you may encounter bugs and there's a possibility of data loss.</p>
								<p>I'm continuously working on improvements, but since this is a personal project, updates and support may be slow at times.</p>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </section>

    <!-- Footer -->
    <footer class="container mx-auto px-6 py-8 border-t">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          © 2024 - 2025 BuddyGenAI. All rights reserved.
        </div>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="https://github.com/parsehex/BuddyGenAI" class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
            GitHub
          </a>
          <!-- <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
            Discord
          </a> -->
        </div>
      </div>
    </footer>
  </div>
	<Dialog v-model:open="isLightboxOpen">
    <DialogContent class="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Preview</DialogTitle>
        <DialogDescription>
          <img
            :src="selectedImage"
            alt="Large preview"
            class="w-full h-auto rounded-lg"
          />
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import {
  Button,
  Card,
  CardHeader,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CardTitle,
  CardContent,
  Alert,
  AlertTitle,
  AlertDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui'
import { ref } from 'vue'

const pics = [
  '/images/logo-cover.png',
  // '/images/home page.png',
  // '/images/dark mode.png',
  // '/images/EHQjjn.png',
  // '/images/buddy list.png',
  // '/images/JJUK2v.png',
]

const isLightboxOpen = ref(false)
const selectedImage = ref('')

const openLightbox = (image) => {
  selectedImage.value = image
  isLightboxOpen.value = true
}
</script>

<style scoped>
.carousel-container {
  @apply relative aspect-square rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 p-8;
}

.carousel-item img {
  @apply transition-transform duration-300 hover:scale-105;
}

:deep(.carousel-button) {
  @apply absolute top-1/2 -translate-y-1/2;
  @apply bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm;
  @apply border-2 border-gray-200 dark:border-gray-700;
  @apply hover:bg-white dark:hover:bg-gray-800;
  @apply shadow-lg;
  @apply rounded-full;
  /* Ensure buttons are above the images */
  z-index: 20;
}

:deep(.carousel-button:hover) {
  @apply scale-110 transition-transform;
}

:deep(.carousel-button svg) {
  @apply w-4 h-4 text-gray-800 dark:text-gray-200;
}

.carousel-container {
  @apply relative aspect-square rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 p-8;
}

.carousel-item img {
  @apply transition-transform duration-300 hover:scale-105;
}
</style>
