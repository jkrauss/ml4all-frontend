<script>
	import { fade } from "svelte/transition";
	import { clickOutside } from "./clickOutside";
	export let menuToggle;
</script>

{#if menuToggle}
	<div
		class="absolute right-full top-0 rounded text-black py-2 text-xl bg-white shadow-xl"
		transition:fade
		on:click={() => {
			menuToggle = !menuToggle;
		}}
		use:clickOutside
		on:click_outside={() => {
			menuToggle = false;
		}}
	>
		<ul>
			<slot />
		</ul>
	</div>
{/if}
