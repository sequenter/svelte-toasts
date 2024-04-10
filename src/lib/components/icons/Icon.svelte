<script lang="ts">
	import type { IconType } from '$lib/types';
	import SVG from './svg/SVG.svelte';

	export let type: IconType;
	export let onClick: (() => void) | undefined = undefined;
</script>

<div class={`flex items-center justify-center ${$$props.class}`}>
	{#if onClick}
		<button class="transition-opacity opacity-60 hover:opacity-100" on:click={onClick}
			><SVG {type} /></button
		>
	{:else}
		<SVG {type} />
	{/if}
</div>
