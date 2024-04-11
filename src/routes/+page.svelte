<script lang="ts">
	import { ToastWrapper } from '$lib/components';
	import Button from '$lib/components/Button.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import { toasts } from '$lib/stores/toasts.store';
	import type { Position, ToastOptions } from '$lib/types';

	const positions: Position[] = ['bottom', 'end', 'start', 'top'] as const;

	const types: { message: string; opts?: ToastOptions }[] = [
		{ message: 'info' },
		{ message: 'success', opts: { type: 'success' } },
		{ message: 'error', opts: { type: 'error' } },
		{ message: 'warning', opts: { type: 'warning' } }
	] as const;

	const actions: { label: string; func: () => void }[] = [
		{
			label: 'clear',
			func: () => {
				toasts.clear();
			}
		},
		{
			label: 'pop old',
			func: () => {
				toasts.pop('old');
			}
		},
		{
			label: 'pop new',
			func: () => {
				toasts.pop('new');
			}
		},
		{
			label: 'push',
			func: () => {
				toasts.push('push', { auto: toggles.auto, icon: toggles.icon, pausable: toggles.pausable });
			}
		}
	] as const;

	const toggles: { [x: string]: boolean } = {
		auto: true,
		icon: true,
		pausable: true
	};

	let position: Position = 'end';
</script>

<div class="flex flex-col items-center p-5 gap-3">
	<div class="text-center">
		<h1 class="text-2xl font-bold">svelte-toasts</h1>
		<p>Yet another Svelte toasts library</p>
	</div>

	<div class="h-96 w-full rounded-lg bg-zinc-800"></div>

	<div
		class="flex flex-col w-full gap-3 p-5 text-center rounded-lg border-2 border-dashed border-gray-500"
	>
		<h3 class="text-xl">TOGGLES</h3>
		<ul class="flex justify-center gap-8">
			{#each Object.keys(toggles) as label}
				<li class="flex flex-col items-center">
					<h4 class="text-lg">{label}</h4>
					<Switch bind:checked={toggles[label]} />
				</li>
			{/each}
		</ul>
	</div>

	<div class="flex gap-3 w-full">
		<div
			class="grow flex flex-col gap-3 p-5 text-center rounded-lg border-2 border-dashed border-gray-500"
		>
			<h3 class="text-xl">POSITION</h3>
			<ul class="list-none space-y-2">
				{#each positions as pos}
					<li>
						<Button
							label={pos}
							on:click={() => {
								position = pos;
							}}
						/>
					</li>
				{/each}
			</ul>
		</div>
		<div
			class="grow flex flex-col gap-3 p-5 text-center rounded-lg border-2 border-dashed border-gray-500"
		>
			<h3 class="text-xl">TYPES</h3>
			<ul class="list-none space-y-2">
				{#each types as { message, opts }}
					<li>
						<Button
							label={message}
							on:click={() => {
								toasts.push(message, {
									...opts,
									...{ auto: toggles.auto, icon: toggles.icon, pausable: toggles.pausable }
								});
							}}
						/>
					</li>
				{/each}
			</ul>
		</div>
		<div
			class="grow flex flex-col gap-3 p-5 text-center rounded-lg border-2 border-dashed border-gray-500"
		>
			<h3 class="text-xl">ACTIONS</h3>
			<ul class="list-none space-y-2">
				{#each actions as { label, func }}
					<li>
						<Button {label} on:click={func} />
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<ToastWrapper {position} />
