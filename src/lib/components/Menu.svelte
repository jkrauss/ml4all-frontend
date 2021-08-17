<script>
	import { fade } from "svelte/transition";
	export let menuToggle;
</script>

{#if menuToggle}
	<div
		class="absolute right-full top-0 rounded text-black py-2 text-xl bg-white shadow-xl"
		transition:fade
		on:click={() => {
			menuToggle = !menuToggle;
		}}
	>
		<ul>
			<slot />
		</ul>
	</div>
{/if}
