# svelte-toasts

**svelte-toasts** is yet another toast library for [Svelte](https://svelte.dev/), written with [Typescript](https://www.typescriptlang.org/), [TailwindCSS](https://tailwindcss.com/), and formatted with [Prettier](https://prettier.io/).

View the [demo](https://sequenter.github.io/svelte-toasts/).

## Usage

TODO: Installation

Import the `ToastWrapper` component, with optional `position`, `toastDefaults` and `animationDefaults`.

```svelte
<script lang="ts">
    import { AnimationOptions, Position, ToastOptions, ToastWrapper } from '';

    const toastDefaults: ToastOptions = {
        ...
    };

    const animationDefaults: AnimationOptions = {
        ...
    };
</script>

...

<ToastWrapper position="end" {toastDefaults} {animationDefaults} />
```

Import the `toasts` store and push as much toast as you desire.

```svelte
<script lang="ts">
	import { toasts } from '';

	toasts.push('Toast Me!');
</script>
```

## Functions

```typescript
/**
 * Remove all toasts from the store.  Sets the fade transition duration to 0 beforehand, to ensure toasts
 * are cleared instantly after awaiting 'tick'.
 */
const clear = async () => { ... }

/**
 * Removes a toast from the store based on the given {@link id}.  This can relate to the id number of
 * a toast or {@link ToastPop}.  'new' removes the latest toast, whereas 'old' removes the oldest.
 * @param {number | ToastPop} id The id of the toast to remove, or either 'new' or 'old'.
 */
const pop = (id: number | ToastPop) => { ... }

/**
 * Push a new toast to the store.
 * @param {string} message The message for the toast to display.
 * @param {ToastOptions} opts (optional)
 * @returns {number} Id of the toast.
 */
const push = (message: string, opts?: ToastOptions): number => { ... }
```

## Options

### Toast Options

```typescript
toasts.push('...', {
	auto: boolean;
	border: 'bottom' | 'end' | 'start' | 'top' | 'all';
	duration: number;
	icon: boolean,
	pausable: boolean,
	type: 'error' | 'info' | 'success' | 'warning';
});
```

#### ToastOptions

- **auto**: Whether or not the toast is automatically dismissed after `duration` has elapsed.
  - _default_: `true`
- **border**: Position of the toasts border.
  - _default_: `start`
- **duration**: Amount of time in ms to elapse before dismissing, in conjunction with `auto`.
  - _default_: `3000`
- **icon**: Whether or not to display an icon related to `type`.
  - _default_: `true`
- **pausable**: Whether or not `duration` is able to be paused by mouse hover.
  - _default_: `true`
- **type**: The type of the toast, which affects `icon` and `border` colour.
  - _default_: `info`

### Default Options

If you want to stick to a style and would prefer to not give `ToastOptions` every time you push a toast, defaults can instead be set on the `ToastWrapper`.

```typescript
const toastDefaults: ToastOptions = {
    ...
};

const animationDefaults: AnimationOptions = {
    fade: {}, // FadeParams
    flip: {}, // FlipParams
    fly:  {}  // FlyParams
};
```

```svelte typescript
<ToastWrapper position={'bottom' | 'end' | 'start' | 'top'} {animationDefaults} {toastDefaults} />
```

#### ToastOptions

as [above](#ToastOptions).

#### AnimationOptions

- **fade**: Fade transition parameters. **OUT** transition.
  - _default_: `{ duration: 400 }`
- **flip**: Flip animation parameters.
  - _default_: `{ duration: 400 }`
- **fly**: Fly transition parameters. **IN** transition.
  - _default_: `{ duration: 400 }`
