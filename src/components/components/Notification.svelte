<script>
	import { notification } from "../stores";
	import { fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";
</script>

{#if $notification && Object.keys($notification).length}
	<div
		class="fixed right-8 bottom-20 bg-green-500 rounded px-8 py-4"
		style={`background: ${$notification.bg}; color: ${$notification.color}`}
		in:fly={{
			duration: 300,
			x: 0,
			y: 500,
			opacity: 0.5,
			easing: quintOut,
		}}
		out:fly={{
			delay: 250,
			duration: 300,
			x: 500,
			y: 0,
			opacity: 0.5,
			easing: quintOut,
		}}
	>
		{$notification.text}
	</div>
{/if}
