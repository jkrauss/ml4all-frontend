<script>
	import { user, userSettings, userSettingsInit, notification } from "../components/stores";
	import Slider from "@smui/slider";
	import Switch from "@smui/switch";
	import FormField from "@smui/form-field";
	import Paper, { Title, Content } from "@smui/paper";
	import Select, { Option } from "@smui/select";
	import List, { Item, Separator, Subheader } from "@smui/list";
	import axios from "axios";
	import { fade } from "svelte/transition";

	function changeStore(storeObject) {
		$userSettings.state = storeObject.state;
		$userSettings.city = storeObject.city;
		$userSettings.store_name = storeObject.store_name;
	}

	let files;
	$: {
		testFileUploaded(files);
	}
	function testFileUploaded(newValue) {
		if (files && files[0]) {
			console.log(newValue[0].name);

			let ext = files[0].name.split('.').pop();
			switch (ext) {
				case 'xls':
				case 'xlsx':

				console.log('Allowed');
				
				let formData = new FormData();
				formData.append('file', files[0]);
				axios.post( '/api/sales_upload',
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
					).then((response)=>{
					console.log(response.data);
					})
					.catch(function(){
					console.log('FAILURE!!');
				});

				break;
			default:
				console.log('Not allowed');
				files = null;
				$notification = {
					text: "Es können nur Excel-Dateien hochgeladen werden.",
					bg: "var(--mdc-theme-callout);",
					color: "var(--mdc-theme-on-primary);",
				};
				setTimeout(() => {
					$notification = undefined;
				}, 5000);
				//files[0] = '';// is readonly
			}
		}
	};
</script>
<style>
	.file {
		opacity: 0;
		width: 0.1px;
		height: 0.1px;
		position: absolute;
	}
	input:hover + label,
	input:focus + label {
		transform: scale(1.015);
		filter: brightness(104%);
	}
	.file-input label {
		display: block;
		position: relative;
		width: fit-content;
		background: "var(--mdc-theme-callout)";
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: transform .2s ease-out;
	}
</style>

{#if Object.keys($userSettings).length > 0}
<section class="flex flex-col gap-4 md:w-10/12 w-full mx-auto " in:fade>
	<Paper elevation={1}>
		<Title><h1 class="text-2xl my-6">Einstellungen</h1></Title>
		<Content>
			<List>
				<div class="flex justify-between">
					<h2>angemeldete/r Benutzer*In</h2>
					<p>{$userSettings?.username || "DEMO"}</p>
				</div>
				{#if $userSettings?.register_plugin_name}
					<div class="flex justify-between">
						<h2>Kassensystem</h2>
						<div>
							<p>{$userSettings?.register_plugin_name}</p>
							<br />
							{#if $userSettings?.register_plugin==="plugins.manual.manual"}
								<div class="file-input">
									<input 
										type="file" 
										id="file" 
										class="file" 
										bind:files 
										accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
									>
									<label for="file"
									style="background: {"var(--mdc-theme-callout)"}"
									class="px-4 py-2 m-0 text-white text-sm font-medium tracking-widest rounded-sm"
									> DATEI HOCHLADEN </label>
								</div>
								{#if files && files[0]}
									<p>{files[0].name}</p>
								{:else}
									<p style="text-align: center;">(.xlsx, .xls)</p>
								{/if}
							{/if}
							<br />
						</div>
					</div>
				{/if}
				<Separator /><br />

					<div class="flex justify-between">
						<h2>Standort</h2>
						<p>
							<Select
								bind:value={$userSettings.store}
								style="max-width:150px;"
							>
								{#each $userSettings.stores as s}
									<Option
										value={s.store}
										on:SMUI:action={() => changeStore(s)}
										>{s.store_name}</Option
									>
								{:else}
									<Option>Problem Loading</Option>
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
							/>
							<span slot="label">Morgen</span>
						</FormField>
					</div>
					<div>
						<FormField>
							<Switch
								color="primary"
								bind:checked={$userSettings.day_after_tomorrow}
							/>
							<span slot="label">Übermorgen</span>
						</FormField>
					</div>
					<div>
						<FormField>
							<Switch
								color="primary"
								bind:checked={$userSettings.next_seven_days}
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
{/if}
