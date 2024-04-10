<script lang="ts">
	import '../app.css';
	import { ToastWrapper } from '$lib/components';
</script>

<main class="container w-full max-w-lg mx-auto">
	<slot />
</main>

<ToastWrapper />
