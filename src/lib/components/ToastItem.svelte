<script lang="ts">
	import { Icon } from '$lib/components/icons';
	import { linear } from 'svelte/easing';
	import { toastColourMapper } from '$lib/utils/mappers.utils';
	import type { ToastType } from '$lib/types';
	import { tweened } from 'svelte/motion';

	export let auto: boolean;
	export let duration: number;
	export let icon: boolean;
	export let message: string;
	export let type: ToastType;
	export let onClose: () => void;

	const progress = tweened(100, { duration, easing: linear });
	auto && progress.set(0);

	$: colour = toastColourMapper[type];
</script>

<div
	class="flex flex-col w-64 min-h-14 text-white rounded-lg border-l-4 bg-zinc-900 text-md drop-shadow-md overflow-hidden {colour.border}"
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
