import { defaultToastStore, defaultAnimationStore } from './defaults.store';
import { get, writable } from 'svelte/store';
import type { Toast, ToastOptions, ToastPop } from '$lib/types';
import { animationStore } from './animation.store';
import { tick } from 'svelte';

const createStore = () => {
	let toastId = 0;

	const { set, subscribe, update } = writable<(Required<ToastOptions> & Toast)[]>([]);

	const pop = async (id: number | ToastPop) => {
		switch (id) {
			case 'new':
				update((toasts) => toasts.slice(1));
				break;
			case 'old':
				update((toasts) => toasts.slice(0, toasts.length - 1));
				break;
			default:
				update((toasts) => toasts.filter((toast) => toast.id !== id));
		}
	};

	const push = async (message: string, opts?: ToastOptions) => {
		const options = { ...get(defaultToastStore), ...opts } as Required<ToastOptions>;
		const id = toastId++;

		update((toasts) => [{ ...options, ...{ id, message } }, ...toasts]);
	};

	const clear = async () => {
		animationStore.update((animations) => ({ ...animations, ...{ fade: { duration: 0 } } }));
		await tick();

		set([]);
		animationStore.set(get(defaultAnimationStore));
	};

	return {
		pop,
		push,
		clear,
		subscribe
	};
};

export const toasts = createStore();
