<script>
	import Button, { Label } from "@smui/button";
	import html2canvas from "html2canvas";
	import Textfield from "@smui/textfield";
	import { modal, screenShotMode } from "../stores";
	let problemText = "",
		screenshot,
		problemJSON = {};
</script>

<section
	class="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-8 p-4"
>
	<div class="flex justify-center items-center flex-col">
		<div class="flex justify-center items-center">
			{#if screenshot}
				<img src={screenshot} alt="screenshot" class="mx-auto" />
			{/if}
		</div>

		<Button
			class="whitespace-nowrap w-full"
			on:click={() => {
				$screenShotMode = true;
				setTimeout(() => {
					html2canvas(document.body).then((canvas) => {
						const base64image = canvas.toDataURL("image/png");
						screenshot = base64image;
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
		on:submit|preventDefault={() => {
			problemJSON.img = screenshot;
			problemJSON.text = problemText;
			console.log("send", problemJSON);
		}}
	>
		<Textfield
			textarea
			style="width: 100%;"
			helperLine$style="width: 100%;"
			bind:value={problemText}
			label="Problem Beschreibung"
		/>
		<Button
			variant="raised"
			class="w-full"
			on:click={() => {
				problemJSON.img = screenshot;
				problemJSON.text = problemText;
				console.log("send", problemJSON);
			}}
		>
			<Label>Melden</Label>
		</Button>
	</from>
</section>
