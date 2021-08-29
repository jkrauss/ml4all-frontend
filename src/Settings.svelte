<script>
	import { user, userSettings, userSettingsInit } from "./lib/stores";
	import Slider from "@smui/slider";
	import Switch from "@smui/switch";
	import FormField from "@smui/form-field";
	import Paper, { Title, Content } from '@smui/paper';
	import Select, { Option } from '@smui/select';
	import List, { Item, Separator, Subheader } from '@smui/list';
 
	 //let selectedStore = $userSettings?.store;

	function changeStore(storeObject){
		//$userSettings.store = storeObject.store;
		$userSettings.state = storeObject.state;
		$userSettings.city = storeObject.city;
		$userSettings.store_name = storeObject.store_name;
	}
	console.log("$userSettings.store:", $userSettings.store);
</script>


<section class="flex flex-col gap-4 md:w-10/12 w-full mx-auto p-2">
	<Paper elevation={1}>
		<Title><h1 class="text-2xl my-6">Einstellungen</h1></Title>
		<Content>
			<List>
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

				<Separator /><br />
				
				<div class="flex justify-between">
					<h2>Standort</h2>
					<p>
						<Select bind:value={$userSettings.store} style="max-width:150px;">
							{#each $userSettings?.stores as s}
								<Option 
									value={s.store}
									on:SMUI:action={() =>  changeStore(s)}

								>{s.store_name}</Option>
							{/each}
						</Select>
					</p>
				</div>
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

				<Separator /><br />

				<h2 class="text-xl my-6">Vorhersage und Planung</h2>
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

				{#if $userSettings.rows_per_page}
				<br />
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

			</List>
		</Content>
	</Paper>
</section>
