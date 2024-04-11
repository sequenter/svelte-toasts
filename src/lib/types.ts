export type AnimationProp = 'delay' | 'duration';

export type Animation = {
	[key in AnimationProp]: number;
};

export type Position = 'bottom' | 'end' | 'start' | 'top';

export type ToastPop = 'new' | 'old';

export type ToastType = 'error' | 'info' | 'success' | 'warning';

export type IconType = ToastType | 'close';

export interface ToastOptions {
	auto?: boolean;
	duration?: number;
	icon?: boolean;
	pausable?: boolean;
	type?: ToastType;
}

export interface Toast {
	id: number;
	message: string;
}
