<script lang="ts">
	import { toasts } from '$lib/stores/toasts.store';

	toasts.add('Info!');
	toasts.add('Success!', { type: 'success' });
	toasts.add('Error!', { auto: false, type: 'error' });
	toasts.add('Warning!', { type: 'warning' });
</script>
