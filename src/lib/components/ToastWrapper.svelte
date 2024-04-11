<script lang="ts">
	import type { AnimationOptions, Position, ToastOptions } from '$lib/types';
	import { defaultAnimationStore, defaultToastStore } from '$lib/stores/defaults.store';
	import { fade, fly } from 'svelte/transition';
	import { flyMapper, positionMapper } from '$lib/utils/mappers.utils';
	import { animationStore } from '$lib/stores/animation.store';
	import { flip } from 'svelte/animate';
	import ToastItem from './ToastItem.svelte';
	import { toasts } from '$lib/stores/toasts.store';

	export let position: Position = 'end';
	export let toastDefaults: ToastOptions | undefined = undefined;
	export let animationDefaults: AnimationOptions | undefined = undefined;

	toastDefaults && defaultToastStore.update((current) => ({ ...current, ...toastDefaults }));
	animationDefaults &&
		defaultAnimationStore.update((current) => ({ ...current, ...animationDefaults }));
</script>

<ul class="fixed list-none z-50 {positionMapper[position]}">
	{#each $toasts as { auto, border, duration, icon, id, message, pausable, type } (id)}
		<li
			in:fly={{ ...flyMapper[position], ...$animationStore.fly }}
			out:fade={$animationStore.fade}
			animate:flip={$animationStore.flip}
		>
			<ToastItem
				{auto}
				{border}
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
