export type Position = 'bottom' | 'end' | 'start' | 'top';

export type ToastType = 'error' | 'info' | 'success' | 'warning';

export type IconType = ToastType | 'close';

export interface ToastOptions {
	auto?: boolean;
	duration?: number;
	icon?: boolean;
	type?: ToastType;
}
