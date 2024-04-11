import { tweened, type TweenedOptions } from 'svelte/motion';
import { get } from 'svelte/store';

interface Options extends TweenedOptions<number> {
	duration: number;
	then: () => void;
}

export function tween(options: Options) {
	const max = 100;
	const min = 0;
	const store = tweened(max, options);

	const begin = () => {
		store.set(min, options).then(options.then);
	};

	const pause = () => {
		store.set(get(store), { duration: 0 });
	};

	const resume = () => {
		const progress = get(store);
		const completed = (max - progress) / max;
		const remaining = options.duration - options.duration * completed;

		store.set(min, { duration: remaining }).then(options.then);
	};

	return { ...store, begin, pause, resume };
}
