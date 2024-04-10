<script lang="ts">
	import { iconMapper } from '$lib/utils/mappers.utils';
	import type { IconType } from '$lib/types';

	export let type: IconType;
</script>

<div class="w-6 h-6">
	<svelte:component this={iconMapper[type]} />
</div>
