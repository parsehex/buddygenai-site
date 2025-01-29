<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const props = defineProps({
	src: {
		type: String,
		required: true,
	},
	alt: {
		type: String,
		required: false,
	}
});
</script>

<template>
	<Dialog>
    <DialogTrigger as-child>
			<img
				:src="props.src || '/placeholder.svg'"
				title="View image"
				:alt="props.alt"
				class="mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center cursor-pointer"
			/>
    </DialogTrigger>
    <DialogContent class="max-w-[75vw]">
      <div class="grid gap-4 py-4">
        <img
					:src="props.src || '/placeholder.svg'"
					:alt="props.alt"
					class="relative top-[-25px] left-[-10px] mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center"
				/>
      </div>
    </DialogContent>
  </Dialog>
</template>
