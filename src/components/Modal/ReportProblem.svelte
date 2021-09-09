<script>
	import Button, { Label } from "@smui/button";
	import html2canvas from "html2canvas";
	import Textfield from "@smui/textfield";
	import {
		backendURL,
		screenShotMode,
		problemReport,
		modal,
		notification,
		svelteRenderParent,
	} from "../stores";
	import axios from "axios";
	$: if (!$problemReport || Object.keys($problemReport).length == 0) {
		$problemReport.problem_text = "";
	}

	let response;
</script>

<section
	class="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-8 p-4"
>
	<div class="flex justify-center items-center flex-col">
		<div class="flex justify-center items-center">
			{#if $problemReport.screenshot}
				<img
					src={$problemReport.screenshot}
					alt="screenshot"
					class="mx-auto aspect-w-16 aspect-h-9 max-h-32"
				/>
			{/if}
		</div>
		<Button
			class="whitespace-nowrap w-full"
			on:click={() => {
				html2canvas($svelteRenderParent).then((canvas) => {
					const base64image = canvas.toDataURL("image/png");
					$problemReport.screenshot = base64image;
				});
			}}
		>
			<Label>Bidschirmfoto aufnehmen</Label>
		</Button>
	</div>
	<from
		class=" flex flex-col  gap-4 w-full"
		on:submit|preventDefault={async () => {
			let { data } = await axios.post(
				`${backendURL}/api/problem/`,
				$problemReport
			);
			$problemReport = { problem_text: "" };
			if (data) {
				$notification = {
					text: "Dankeschön, wir kümmern uns schnellstmöglich darum.",
					bg: "var(--mdc-theme-callout);",
					color: "var(--mdc-theme-on-primary);",
				};
				setTimeout(() => {
					$notification = undefined;
				}, 5000);
				$modal = {};
			}
		}}
	>
		<textarea
			class="w-full"
			bind:value={$problemReport.problem_text}
			name="problem_text"
			rows="4"
			cols="50"
			placeholder="Problem Beschreibung"
		/>

		<Button
			variant="raised"
			class="w-full"
			on:click={async () => {
				let { data } = await axios.post(
					`${backendURL}/api/problem`,
					$problemReport
				);
				$problemReport = { problem_text: "" };
				if (data) {
					$notification = {
						text: "Dankeschön, wir kümmern uns schnellstmöglich darum.",
						bg: "var(--mdc-theme-callout);",
						color: "var(--mdc-theme-on-primary);",
					};
					setTimeout(() => {
						$notification = undefined;
					}, 5000);
					$modal = {};
				}
			}}
		>
			<Label>Melden</Label>
		</Button>
	</from>
</section>
{#if response}
	<div class="absolute top-60 w-full bg-green-500 text-white rounded">
		{response}
	</div>
{/if}
