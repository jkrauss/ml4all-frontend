<script>
	import { fly, fade } from "svelte/transition";
	import IconButton from "@smui/icon-button";
	import { modal, mainContent, screenShotMode } from "../stores.js";
</script>

{#if $modal && Object.keys($modal).length != 0 && !$screenShotMode}
	<div
		class="fixed top-0 bottom-0 left-0 right-0 overflow-hidden flex justify-center items-center z-40 h-screen w-screen"
	>
		<div
			class="bg-black bg-opacity-75 w-screen h-screen z-10 absolute top-0 left-0 bottom-0 right-0 "
			transition:fade
			on:click={() => {
				$modal = {};
			}}
		/>
		<main
			class="bg-white rounded md:w-6/12 z-20 flex flex-col divide-y divide-gray-600"
			transition:fly={{ x: 500 }}
		>
			<header class="p-2 flex justify-between items-center">
				<h1 class="text-2xl">{$modal?.title}</h1>
				<IconButton
					class="material-icons"
					on:click={() => {
						$modal = {};
					}}
					>close
				</IconButton>
			</header>
			<main class="p-2">
				<svelte:component this={$modal?.component} />
			</main>
		</main>
	</div>
{/if}
