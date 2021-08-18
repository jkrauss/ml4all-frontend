<script>
	import { userSettings } from "./lib/stores";
	import Slider from "@smui/slider";
	import Switch from "@smui/switch";
	import FormField from "@smui/form-field";
</script>

<section class="flex flex-col gap-4 md:w-10/12 w-full mx-auto p-2">
	<h1 class="text-2xl my-6">Einstellungen</h1>
	<div class="flex justify-between">
		<h2>angemeldete/r Benutzer*In</h2>
		<p>{$userSettings?.username || "DEMO"}</p>
	</div>
	{#if $userSettings?.register_plugin}
		<div class="flex justify-between">
			<h2>Kassensystem</h2>
			<p>{$userSettings?.register_plugin}</p>
		</div>
	{/if}
	<div class="flex justify-between">
		<h2>Land</h2>
		<p>{$userSettings?.country}</p>
	</div>
	<div class="flex justify-between">
		<h2>Bundesland</h2>
		<p>{$userSettings?.state}</p>
	</div>
	<div class="flex justify-between">
		<h2>Stadt</h2>
		<p>{$userSettings?.city}</p>
	</div>
	<div class="flex justify-between">
		<h2>Standort</h2>
		<p>{$userSettings?.store_name}</p>
	</div>
	{#if $userSettings.rows_per_page}
		<div class="flex flex-col">
			<div class="flex justify-between">
				<h2>Zeilen pro Seite</h2>
				<p>{$userSettings.rows_per_page}</p>
			</div>

			<div class="w-full">
				<Slider
					bind:value={$userSettings.rows_per_page}
					min={10}
					max={100}
					step={10}
					discrete
					input$aria-label="Discrete slider"
				/>
			</div>
		</div>
	{/if}

	<h2 class="text-xl my-6">Vorhersage anzeigen</h2>
	<div>
		<FormField>
			<Switch
				color="primary"
				bind:checked={$userSettings.tomorrow}
				on:click={() => {
					$userSettings.day_after_tomorrow = false;
					$userSettings.next_seven_days = false;
				}}
			/>
			<span slot="label">Morgen</span>
		</FormField>
	</div>
	<div>
		<FormField>
			<Switch
				color="primary"
				bind:checked={$userSettings.day_after_tomorrow}
				on:click={() => {
					$userSettings.tomorrow = false;
					$userSettings.next_seven_days = false;
				}}
			/>
			<span slot="label">Übermorgen</span>
		</FormField>
	</div>
	<div>
		<FormField>
			<Switch
				color="primary"
				bind:checked={$userSettings.next_seven_days}
				on:click={() => {
					$userSettings.tomorrow = false;
					$userSettings.day_after_tomorrow = false;
				}}
			/>
			<span slot="label">Nächste 7 Tage</span>
		</FormField>
	</div>
</section>
