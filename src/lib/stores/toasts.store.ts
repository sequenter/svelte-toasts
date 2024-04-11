import type { Toast, ToastOptions, ToastPop } from '$lib/types';
import { animationStore } from './animation.store';
import { tick } from 'svelte';
import { writable } from 'svelte/store';

const defaultOptions: ToastOptions = {
	auto: true,
	duration: 3000,
	icon: true,
	pausable: true,
	type: 'info'
};

const createStore = () => {
	let toastId = 0;

	const { set, subscribe, update } = writable<(Required<ToastOptions> & Toast)[]>([]);

	const pop = async (id: number | ToastPop) => {
		animationStore.set('delay');
		await tick();

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
		const options = { ...defaultOptions, ...opts } as Required<ToastOptions>;
		const id = toastId++;

		animationStore.set('delay', 0);
		await tick();

		update((toasts) => [{ ...options, ...{ id, message } }, ...toasts]);
	};

	const clear = async () => {
		animationStore.set('duration', 0);
		await tick();

		set([]);
		animationStore.set('duration');
	};

	return {
		pop,
		push,
		clear,
		subscribe
	};
};

export const toasts = createStore();

export const toastsDelay = writable<number>(0);
