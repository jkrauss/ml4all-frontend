<script>
	import Button, { Label } from "@smui/button";
	import html2canvas from "html2canvas";
	import Textfield from "@smui/textfield";
	import {
		backendURL,
		screenShotMode,
		problemReport,
		modal,
	} from "../stores";
	import axios from "axios";
	$: if (!$problemReport || Object.keys($problemReport).length == 0) {
		$problemReport.problem_text = "";
	}
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
				$screenShotMode = true;
				setTimeout(() => {
					html2canvas(document.body).then((canvas) => {
						const base64image = canvas.toDataURL("image/png");
						$problemReport.screenshot = base64image;
					});
				}, 200);
				setTimeout(() => {
					$screenShotMode = false;
				}, 400);
			}}
		>
			<Label>Take Screenshot</Label>
		</Button>
	</div>
	<from
		class=" flex flex-col  gap-4 w-full"
		on:submit|preventDefault={async () => {
			console.log("send", $problemReport);
			let { data } = await axios.post(
				`${backendURL}/api/problem/`,
				$problemReport
			);
			$problemReport = { problem_text: "" };
			console.log(data);
		}}
	>
		<Textfield
			textarea
			style="width: 100%;"
			helperLine$style="width: 100%;"
			bind:value={$problemReport.problem_text}
			label="Problem Beschreibung"
		/>
		<Button
			variant="raised"
			class="w-full"
			on:click={async () => {
				console.log("send", $problemReport);
				let { data } = await axios.post(
					`${backendURL}/api/problem`,
					$problemReport
				);
				$problemReport = { problem_text: "" };
				console.log(data);
				if (data) {
					$modal = {};
				}
			}}
		>
			<Label>Melden</Label>
		</Button>
	</from>
</section>
