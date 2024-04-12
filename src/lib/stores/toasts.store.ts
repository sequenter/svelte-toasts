import { defaultToastStore, defaultAnimationStore } from './defaults.store';
import { get, writable } from 'svelte/store';
import type { Toast, ToastOptions, ToastPop } from '$lib/types';
import { animationStore } from './animation.store';
import { tick } from 'svelte';

const createStore = () => {
	let toastId = 0;

	const { set, subscribe, update } = writable<(Required<ToastOptions> & Toast)[]>([]);

	/**
	 * Removes a toast from the store based on the given {@link id}.  This can relate to the id number of
	 * a toast or {@link ToastPop}.  'new' removes the latest toast, whereas 'old' removes the oldest.
	 * @param {number | ToastPop} id The id of the toast to remove, or either 'new' or 'old'.
	 */
	const pop = (id: number | ToastPop) => {
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

	/**
	 * Push a new toast to the store.
	 * @param {string} message The message for the toast to display.
	 * @param {ToastOptions} opts (optional)
	 * @returns {number} Id of the toast.
	 */
	const push = (message: string, opts?: ToastOptions): number => {
		const options = { ...get(defaultToastStore), ...opts } as Required<ToastOptions>;
		const id = toastId++;

		update((toasts) => [{ ...options, ...{ id, message } }, ...toasts]);

		return id;
	};

	/**
	 * Remove all toasts from the store.  Sets the fade transition duration to 0 beforehand, to ensure toasts
	 * are cleared instantly after awaiting 'tick'.
	 */
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
