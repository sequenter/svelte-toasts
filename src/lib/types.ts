import type { FadeParams, FlyParams } from 'svelte/transition';
import type { FlipParams } from 'svelte/animate';

export type Position = 'bottom' | 'end' | 'start' | 'top';

export type ToastPop = 'new' | 'old';

export type ToastType = 'error' | 'info' | 'success' | 'warning';

export type IconType = ToastType | 'close';

export interface AnimationOptions {
	fade?: FadeParams;
	fly?: FlyParams;
	flip?: FlipParams;
}

export interface ToastOptions {
	auto?: boolean;
	border?: Position | 'all';
	duration?: number;
	icon?: boolean;
	pausable?: boolean;
	reverse?: boolean;
	type?: ToastType;
}

export interface Toast {
	id: number;
	message: string;
}
