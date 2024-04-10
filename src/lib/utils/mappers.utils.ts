import { Close, Error, Info, Success, Warning } from '$lib/components/icons/svg';
import type { ComponentType } from 'svelte';
import type { ToastType } from '$lib/types';

export const iconMapper: { [key in ToastType | 'close']: ComponentType } = {
	close: Close,
	error: Error,
	info: Info,
	success: Success,
	warning: Warning
} as const;

export const toastColourMapper: {
	[key in ToastType]: { text: string; border: string; bg: string };
} = {
	error: {
		text: 'text-red-500',
		border: 'border-red-500',
		bg: 'bg-red-500'
	},
	info: {
		text: 'text-slate-500',
		border: 'border-slate-500',
		bg: 'bg-slate-500'
	},
	success: {
		text: 'text-green-500',
		border: 'border-green-500',
		bg: 'bg-green-500'
	},
	warning: {
		text: 'text-yellow-500',
		border: 'border-yellow-500',
		bg: 'bg-yellow-500'
	}
};
