import type { ToastOptions } from '$lib/types';
import { writable } from 'svelte/store';

interface Toast {
	id: number;
	message: string;
}

const defaultOptions: ToastOptions = {
	auto: true,
	duration: 10000,
	icon: true,
	type: 'info'
};

const createToasts = () => {
	let toastId = 0;

	const { subscribe, update } = writable<(Required<ToastOptions> & Toast)[]>([]);

	const remove = (id: number) => {
		update((toasts) => toasts.filter((toast) => toast.id !== id));
	};

	const add = (message: string, opts?: ToastOptions) => {
		const options = { ...defaultOptions, ...opts } as Required<ToastOptions>;
		const { auto, duration } = options;
		const id = toastId++;

		update((toasts) => [{ ...options, ...{ id, message } }, ...toasts]);

		auto &&
			setTimeout(() => {
				remove(id);
			}, duration);
	};

	return {
		add,
		remove,
		subscribe
	};
};

export const toasts = createToasts();
