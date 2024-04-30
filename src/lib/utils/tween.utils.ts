import { tweened, type TweenedOptions } from 'svelte/motion';
import { get } from 'svelte/store';

interface Options extends TweenedOptions<number> {
	duration: number;
	reverse: boolean;
	then: () => void;
}

export function tween(options: Options) {
	const { duration, reverse, then } = options;
	const max = reverse ? 0 : 100;
	const min = reverse ? 100 : 0;
	const store = tweened(max, options);

	const begin = () => {
		store.set(min, options).then(then);
	};

	const pause = () => {
		store.set(get(store), { duration: 0 });
	};

	const resume = () => {
		const progress = get(store);
		const completed = reverse ? progress / min : (max - progress) / max;
		const remaining = duration - duration * completed;

		store.set(min, { duration: remaining }).then(then);
	};

	return { ...store, begin, pause, resume };
}
