<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { flyMapper, positionMapper } from '$lib/utils/mappers.utils';
	import { toasts } from '$lib/stores/toasts.store';
	import { flip } from 'svelte/animate';
	import type { Position } from '$lib/types';
	import ToastItem from './ToastItem.svelte';
	import { animationStore } from '$lib/stores/animation.store';

	export let position: Position = 'end';
</script>

<ul class="fixed list-none z-50 {positionMapper[position]}">
	{#each $toasts as { auto, duration, icon, id, message, pausable, type } (id)}
		<li
			in:fly={flyMapper[position]}
			out:fade={{ duration: $animationStore.duration }}
			animate:flip={{ delay: $animationStore.delay }}
		>
			<ToastItem
				{auto}
				{duration}
				{icon}
				{message}
				{pausable}
				{type}
				onClose={() => toasts.pop(id)}
			/>
		</li>
	{/each}
</ul>
