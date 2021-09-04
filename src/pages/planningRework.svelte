<script>
	import axios from "axios";
	import Paper, { Title, Content } from "@smui/paper";
	import { user, userSettings, backendURL } from "../components/stores";
	import Item from "@smui/list/Item.svelte";
	// import { search } from "ss-search";
	let searchInputText;
	let tableWhitelist = ["id", "product"];
	let labels = [
		{ key: "id", text: "ID" },
		{ key: "product", text: "Produkt" },
		{ key: "tomorrow_order_range", text: "Vorschlag Morgen" },
		{ key: "tomorrow_order_qty", text: "Bestellung Morgen" },
		{ key: "day_after_order_range", text: "Vorschlag Übermorgen" },
		{ key: "day_after_order_qty", text: "Bestellung Übermorgen" },
		{ key: "next7_order_range", text: "Vorschlag Woche" },
		{ key: "next7_order_qty", text: "Bestellung Woche" },
	];
	let dataPromise = new Promise(() => {});
	$: dataPromise = new Promise(async (res, rej) => {
		if (!$userSettings || Object.keys($userSettings).length == 0) {
			rej("userSettings Not Defined");
		}
		let dataUrl;

		if ($user && Object.keys($user).length) {
			dataUrl = `${backendURL}${$userSettings.forecast_url}/?store=${$userSettings.store}`;
		} else {
			dataUrl = `tableDataStore${$userSettings.store}.json`;
		}
		let result = await axios.get(dataUrl);

		let keys = [];
		result.data.forEach((val) => {
			Object.keys(val).forEach((ob) => {
				if (!keys.includes(ob)) {
					keys.push(ob);
				}
			});
		});

		if (result) {
			res({ body: result.data, head: keys });
		}
	});
</script>

<section
	class="flex flex-col gap-4 justify-center items-center md:w-10/12 w-full mx-auto"
>
	<Paper elevation={1}>
		<Title><h1 class="text-2xl my-6">Vorhersage und Planung</h1></Title>
		<Content>
			{#await dataPromise}Loading{:then data}
				<div class="flex flex-col gap-4">
					<input
						type="text"
						bind:value={searchInputText}
						placeholder="Suche..."
						class="p-2 rounded-md w-full"
					/>
					<table class="w-full">
						<thead class="border-b border-black">
							{#each data.head as col}
								{#if tableWhitelist.includes(col)}
									<th
										>{labels.find(
											(item) => item.key === col
										)?.text || col}
									</th>
								{/if}
							{/each}
						</thead>

						<tbody>
							{#each data.body as item}
								<tr>
									{#each Object.keys(item) as field}
										{#if tableWhitelist.includes(field)}
											<td>{item[field]}</td>
										{/if}
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
					{data.head}
				</div>
			{:catch error}{error}{/await}
		</Content>
	</Paper>
</section>

<style>
	th,
	td {
		@apply text-center;
		width: 20000px;
	}
	input {
		@apply py-2;
		@apply px-4;
		@apply rounded;
	}
</style>
