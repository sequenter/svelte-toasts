<script lang="ts">
	import type { Position, ToastType } from '$lib/types';
	import { Icon } from '$lib/components/icons';
	import { linear } from 'svelte/easing';
	import { toastBorderMapper, toastColourMapper } from '$lib/utils/mappers.utils';
	import { tween } from '$lib/utils/tween.utils';

	export let auto: boolean;
	export let border: Position | 'all';
	export let duration: number;
	export let icon: boolean;
	export let message: string;
	export let pausable: boolean;
	export let reverse: boolean;
	export let type: ToastType;
	export let onClose: () => void;

	const progress = tween({ duration, reverse, easing: linear, then: onClose });
	auto && progress.begin();

	const colour = toastColourMapper[type];
</script>

<div
	class="flex flex-col w-64 min-h-14 text-white rounded-lg bg-zinc-900 text-md drop-shadow-md overflow-hidden mb-2 {toastBorderMapper[
		border
	]} {colour.border}"
	role="status"
	on:mouseenter={() => {
		auto && pausable && progress.pause();
	}}
	on:mouseleave={() => {
		auto && pausable && progress.resume();
	}}
>
	<div class="flex-1 flex items-center gap-3 p-3">
		{#if icon}
			<Icon {type} class={colour.text} />
		{/if}
		<span class="flex-1 min-w-0 break-words">{message}</span>

		<Icon type="close" onClick={onClose} />
	</div>

	{#if auto}
		<div class="h-1 rounded-full {colour.bg}" style="width: {$progress}%" />
	{/if}
</div>
