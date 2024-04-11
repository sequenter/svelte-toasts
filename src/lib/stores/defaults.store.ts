import type { AnimationOptions, ToastOptions } from '$lib/types';
import { writable } from 'svelte/store';

export const defaultToastStore = writable<ToastOptions>({
	auto: true,
	border: 'start',
	duration: 3000,
	icon: true,
	pausable: true,
	type: 'info'
});

export const defaultAnimationStore = writable<AnimationOptions>({
	fade: { duration: 400 },
	fly: { duration: 400 },
	flip: { duration: 400 }
});
