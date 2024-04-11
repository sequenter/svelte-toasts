import type { Animation, AnimationProp } from '$lib/types';
import { writable } from 'svelte/store';

const createStore = () => {
	const delay = 400;
	const duration = 400;

	const { update, subscribe } = writable<Animation>({ delay, duration });

	const set = (prop: AnimationProp, value?: number) => {
		update((store) => ({
			...store,
			...{ [prop]: value ?? (prop === 'delay' ? delay : duration) }
		}));
	};

	return {
		update,
		set,
		subscribe
	};
};

export const animationStore = createStore();
