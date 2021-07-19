<script>
	//imports
	import { beforeUpdate } from "svelte";
	import Datatable from "./lib/Datatable.svelte";
	import { search } from "ss-search";
    import Textfield, { Input } from '@smui/textfield';
    //import HelperText from '@smui/textfield/helper-text/index';
	// intitial variable declaration
	let data = [], //raw json data from source
		loaded, //used in data reqeust (copied from old)
		keys = [], //all data keys in json objects in data
		blacklist = ["comment", "forecast", "date"], // colum blacklist
		labels = [
			{ key: "product", text: "Produkt" },
			{ key: "order_range", text: "Vorschlag" },
			{ key: "order_qty", text: "Bestellen" },
		], // coustom labels for colums filterd by colum key
		dataTypes = [{ key: "order_qty", type: "number" }], // check if colum has a special type / is number input filterd by key
		pageLength = 10, // pagination page length can be coustomized
		currentPage = 1, // current Page from pagination
		searchInput, // data in the search Field / search text
		displayData, // sorted and filtered data
		searchKeys = ["id", "product"], // keys the search should use
		searchResults, // temporary search results (only temp var)
		sortBy = { col: "id", ascending: true }, // basic sorting data col = key sorted by params
		width, // width of the window;
		styling = {
			all: { bg: "", text: "" }, // overwirtes even and odd
			even: { bg: "var(--mdc-theme-2nd-background)", text: "var(--mdc-theme-secondary)" }, //defines colors for even rows
			odd: { bg: "var(--mdc-theme-background)", text: "var(--mdc-theme-secondary)" }, // var(--VARNAME) can be used to use the vars from foodsight.css
			head: { bg: "var(--mdc-theme-secondary)", text: "var(--mdc-theme-on-secondary)" }, // var(--VARNAME) can be used to use the vars from foodsight.css
		}; // a bit less horrible styling ;)
	// geting data from backend / .json file
	async function getData() {
		if (typeof window === "undefined") return;
		loaded = false;
		// use window.location.origin , see https://stackoverflow.com/questions/11401897/get-the-current-domain-name-with-javascript-not-the-path-etc
		//TODO: need to set authentication-header, containing the received token from login
		const res = await fetch("https://foodsight.azurewebsites.net/api/forecast/?store=2&days=1");
		// use for prod later when CORS-headers are set strict
		//const res = await fetch(window.location.origin + "/api/forecast/?store=2&days=1");
		//use for quick local iterations
		//const res = await fetch("tableData.json");
		const body = await res.json();
		data = body; 
		setTimeout(() => (loaded = true), 500);
	}

	// geting the keys form json objects in data (raw)
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

	// getting data if data.length = 0 and getting keys
	beforeUpdate(async () => {
		if (data.length == 0) {
			await getData();
			keys = getKeys(data);
		}
	});

	//search if the search field is changed so it live reloads (svelte:use)
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

	// runs if data in the function changes so resizing is dynamic and the displayed data is the searched data
	$: {
		displayData = searchResults ? searchResults : data;
		if (width < 768) {
			blacklist = [...blacklist, "order_range"];
		} else {
			blacklist = blacklist.filter((item) => item != "order_range");
		}
		if (styling.all.bg) {
			styling.even.bg = styling.all.bg;
			styling.odd.bg = styling.all.bg;
		}
		if (styling.all.text) {
			styling.even.text = styling.all.text;
			styling.odd.text = styling.all.text;
		}
	}

	// sorting stuff based on the sortBy var
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

<!-- Getting window width -->
<svelte:window bind:outerWidth={width} />

<section class="flex flex-col gap-4 justify-center items-center">
	<!-- Search input field -->
	<input
		type="text"
		bind:value={searchInput}
		placeholder="Suche..."
		class="p-2 rounded-md w-full"
		use:searchF={searchInput}
	/>
	<!-- table itself defined in Datatable.svelte could be changed so its one file. exists because original plan was diferent -->
	<Datatable>
		<!-- Table header  -->
		<tr slot="head">
			<!-- checks every key in keys -->
			{#each keys as key}
				<!-- checks if its blacklisted thus not displayed -->
				{#if !blacklist.includes(key)}
					<!-- th with onclick sort -->
					<th 
						on:click={sort(key)} class=""
						style={`background: ${styling.head.bg};
						color:${styling.head.text};`}
					>
						<!-- div relative because arrow drop up from material ui are absolute relative to this div -->
						<div class="relative">
							<!-- check if column is renamed else key is displayed -->
							{#if labels.find((item) => item.key === key)}
								{labels.find((item) => item.key === key).text}
							{:else}
								{key}
							{/if}
							<!-- sorting arrows each is checking if ith activated or not and styled acordingly -->
							<div class="absolute right-0 top-0 bottom-0">
								<span
									class={`material-icons absolute right-0 -top-1 `}
									class:text-gray-200={sortBy.col == key &&
										!sortBy.ascending}
									class:text-gray-500={sortBy.col != key ||
										sortBy.ascending}
								>
									arrow_drop_up
								</span>
								<span
									class="material-icons absolute right-0 -bottom-1"
									class:text-gray-200={sortBy.col == key &&
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
		<!-- table body in default slot every json object in filterd and sorted array is displayed, index is defined to check pagination  -->
		{#each displayData as dataRow, i}
			<!-- check if item is displayed on curent page -->
			{#if i < pageLength * currentPage && i >= pageLength * (currentPage - 1)}
				<!-- creating new row -->
				<tr
					style={`background: ${
						i % 2 ? styling.even?.bg : styling.odd?.bg
					};
					color:${i % 2 ? styling.even?.text : styling.odd?.text};
					`}
				>
					<!-- getting keys from json object -->
					{#each Object.keys(dataRow) as key}
						<!-- checking if key is blacklisted -->
						{#if !blacklist.includes(key)}
							<!-- creating cell -->
							<td>
								<!-- checking if dataType is special can be edited to display difrent datatypes-->
								{#if dataTypes.find((item) => item.key === key)}
									{#if dataTypes.find((item) => item.key === key).type == "number"}
									<!-- displaying number datatypes as input field 
										<input
											type="number"
											bind:value={dataRow[key]}
											class="min-w-24 w-24"
										/> -->
										<Textfield
											class="shaped-outlined"
											variant="outlined"
											type="number"
											bind:value={dataRow[key]}
										>
										</Textfield>
									{/if}
								{:else}
									<!-- just displying data -->
									{dataRow[key]}
								{/if}
							</td>
						{/if}
					{/each}
				</tr>
			{/if}
		{/each}
	</Datatable>
	<!-- pagination stuff -->
	<div class="w-full flex">
		<!-- container to make it align right -->
		<div class="ml-auto rounded-lg overflow-hidden flex ">
			<!-- checking if page is first page and if not diplaying previous page button -->
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
			<!-- checking and displaying previous page with number -->
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
			<!-- curent pagenumber -->
			<div
				class="px-4 py-2 m-0 h-full text-white"
				style="background: #1d913a;"
			>
				{currentPage}
			</div>
			<!-- next pagenumber -->
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
			<!-- next button -->
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

<!-- some styling -->
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
