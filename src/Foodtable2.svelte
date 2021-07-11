<script>
	import { beforeUpdate } from "svelte";
	import Datatable from "./lib/Datatable.svelte";
	import { search } from "ss-search";
	let data = [],
		loaded,
		keys = [],
		blacklist = ["comment", "forecast"],
		labels = [
			{ key: "product", text: "Produkt" },
			{ key: "order_range", text: "Vorschlag" },
			{ key: "order_qty", text: "Bestellen" },
		],
		dataTypes = [{ key: "order_qty", type: "number" }],
		pageLength = 10,
		currentPage = 1,
		searchInput,
		displayData,
		searchKeys = ["id", "product"],
		searchResults,
		sortBy = { col: "id", ascending: true },
		width;

	async function getData() {
		if (typeof window === "undefined") return;
		loaded = false;
		//const res = await fetch("http://localhost:8000/api/forecast/?clientId=23");
		const res = await fetch("tableData.json");
		const body = await res.json();
		data = body.data;
		setTimeout(() => (loaded = true), 500);
	}

	function getKeys(data) {
		let keys = [];
		data.forEach((val) => {
			let temp = Object.keys(val);
			temp.forEach((ob) => {
				if (!keys.includes(ob)) {
					keys.push(ob);
				}
			});
		});
		return keys;
	}

	beforeUpdate(async () => {
		if (data.length == 0) {
			await getData();
			keys = getKeys(data);
		}
	});

	function searchF(node, searchInput) {
		return {
			update(searchInput) {
				// the value of `bar` has changed
				searchResults = search(data, searchKeys, searchInput);
			},

			destroy() {
				// the node has been removed from the DOM
			},
		};
	}

	$: {
		displayData = searchResults ? searchResults : data;
		if (width < 768) {
			blacklist = [...blacklist, "order_range"];
		} else {
			blacklist = blacklist.filter((item) => item != "order_range");
		}
	}
	$: sort = (column) => {
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending;
		} else {
			sortBy.col = column;
			sortBy.ascending = true;
		}

		// Modifier to sorting function for ascending or descending
		let sortModifier = sortBy.ascending ? 1 : -1;

		let sort = (a, b) =>
			a[column] < b[column]
				? -1 * sortModifier
				: a[column] > b[column]
				? 1 * sortModifier
				: 0;

		displayData = displayData.sort(sort);
	};
</script>

<svelte:window bind:outerWidth={width} />

<section class="flex flex-col gap-4 justify-center items-center">
	<input
		type="text"
		bind:value={searchInput}
		placeholder="Suche..."
		class="p-2 rounded-md w-full"
		use:searchF={searchInput}
	/>
	<Datatable>
		<tr slot="head">
			{#each keys as key}
				{#if !blacklist.includes(key)}
					<th on:click={sort(key)} class="">
						<div class="relative">
							{#if labels.find((item) => item.key === key)}
								{labels.find((item) => item.key === key).text}
							{:else}
								{key}
							{/if}
							<div class="absolute right-0 top-0 bottom-0">
								<span
									class={`material-icons absolute right-0 -top-1 `}
									class:text-gray-900={sortBy.col == key &&
										!sortBy.ascending}
									class:text-gray-500={sortBy.col != key ||
										sortBy.ascending}
								>
									arrow_drop_up
								</span>
								<span
									class="material-icons absolute right-0 -bottom-1"
									class:text-gray-900={sortBy.col == key &&
										sortBy.ascending}
									class:text-gray-500={sortBy.col != key ||
										!sortBy.ascending}
								>
									arrow_drop_down
								</span>
							</div>
						</div>
					</th>
				{/if}
			{/each}
		</tr>
		{#each displayData as dataRow, i}
			{#if i < pageLength * currentPage && i >= pageLength * (currentPage - 1)}
				<tr>
					{#each Object.keys(dataRow) as key}
						{#if !blacklist.includes(key)}
							<td>
								{#if dataTypes.find((item) => item.key === key)}
									{#if dataTypes.find((item) => item.key === key).type == "number"}
										<input
											type="number"
											bind:value={dataRow[key]}
											class="min-w-24 w-24"
										/>
									{/if}
								{:else}
									{dataRow[key]}
								{/if}
							</td>
						{/if}
					{/each}
				</tr>
			{/if}
		{/each}
	</Datatable>
	<div class="w-full flex">
		<div class="ml-auto rounded-lg overflow-hidden flex ">
			{#if currentPage > 1}
				<div
					style="background: #1d913a;"
					class="px-4 py-2 h-full m-0 text-white"
					on:click={() => {
						currentPage--;
					}}
				>
					<span class="material-icons text-sm">
						arrow_back_ios_new
					</span>
				</div>
			{/if}
			{#if currentPage - 1 > 0}
				<div
					style="background: #1d913a;"
					class="px-4 py-2 m-0 h-full text-white"
					on:click={() => {
						currentPage = currentPage - 1;
					}}
				>
					{currentPage - 1}
				</div>
			{/if}
			<div
				class="px-4 py-2 m-0 h-full text-white"
				style="background: #1d913a;"
			>
				{currentPage}
			</div>
			{#if currentPage + 1 <= Math.floor(displayData.length / pageLength) + 1}
				<div
					style="background: #1d913a;"
					class="px-4 py-2 m-0 h-full text-white"
					on:click={() => {
						currentPage = currentPage + 1;
					}}
				>
					{currentPage + 1}
				</div>
			{/if}
			{#if displayData.length > pageLength * currentPage}
				<div
					style="background: #1d913a;"
					class="px-4 py-2 m-0 h-full text-white"
					on:click={() => {
						currentPage++;
					}}
				>
					<span class="material-icons m-0 p-0 text-sm">
						arrow_forward_ios
					</span>
				</div>
			{/if}
		</div>
	</div>
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
