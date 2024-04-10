<script lang="ts">
	import type { Position } from '$lib/types';
	import ToastItem from './ToastItem.svelte';
	import { toasts } from '$lib/stores/toasts.store';

	export let position: Position = 'end';

	const positionSelector: { [key in Position]: string } = {
		bottom: '',
		end: 'top-10 right-10',
		start: 'top-10 left-10',
		top: ''
	} as const;
</script>

<ul class="fixed list-none z-50 space-y-3 {positionSelector[position]}">
	{#each $toasts as { auto, duration, icon, id, message, type }}
		<li>
			<ToastItem
				{auto}
				{duration}
				{icon}
				{message}
				{type}
				onClose={() => {
					toasts.remove(id);
				}}
			/>
		</li>
	{/each}
</ul>
