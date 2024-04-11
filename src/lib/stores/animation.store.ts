import { get, writable } from 'svelte/store';
import type { AnimationOptions } from '$lib/types';
import { defaultAnimationStore } from './defaults.store';

export const animationStore = writable<AnimationOptions>(get(defaultAnimationStore));
