<script lang="ts">
	export let checked: boolean;
</script>

<label class="inline-flex items-center cursor-pointer">
	<input type="checkbox" class="sr-only peer" bind:checked />
	<div
		class="relative w-14 h-7 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"
	></div>
</label>
